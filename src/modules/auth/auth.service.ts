import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { verifyPassword } from 'src/utils/verify-password';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SafeUser } from '../users/entities/safe-user.entity';
import { User } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { JWTPayload } from './dto/jwt-payload.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Tokens } from './dto/tokens.dto';

config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private userService: UsersService,
  ) {}

  async signup(user: CreateUserDto): Promise<SafeUser> {
    return this.userService.create(user);
  }

  async login({ login, password }: LoginDto): Promise<Tokens> {
    const user = await this.users.findOne({
      where: { login },
    });

    if (!user) {
      throw new ForbiddenException('User is not found');
    }

    const isPasswordVerified = await verifyPassword(password, user.password);

    if (!isPasswordVerified) {
      throw new ForbiddenException('Incorrect password');
    }

    return this.getTokens({ userId: user.id, login: user.login });
  }

  async refresh({ refreshToken }: RefreshDto): Promise<Tokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('refreshToken missing');
    }

    try {
      const { userId, login } = verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      ) as JwtPayload;

      return this.getTokens({ userId, login });
    } catch {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }

  private getTokens(payload: JWTPayload): Tokens {
    const accessToken = sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
