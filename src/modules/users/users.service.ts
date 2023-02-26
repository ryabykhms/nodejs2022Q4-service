import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SafeUser } from './entities/safe-user.entity';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const createdUser = this.users.create(createUserDto);

    return (await this.users.save(createdUser)).toResponse();
  }

  async getAll(): Promise<SafeUser[]> {
    const users = await this.users.find();

    return users.map((user) => user.toResponse());
  }

  async getById(id: string): Promise<SafeUser> {
    const user = await this.users.findOne({ where: { id } });

    if (!user) {
      return;
    }

    return user.toResponse();
  }

  async update(id: string, data: UpdatePasswordDto): Promise<SafeUser> {
    const user = await this.users.findOne({ where: { id } });

    if (!user) {
      return;
    }

    if (user.password === data.oldPassword) {
      user.password = data.newPassword;
    } else {
      throw new ForbiddenException('Incorrect password');
    }

    return (await this.users.save(user)).toResponse();
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.users.delete(id);

    return !!deletedUser.affected;
  }
}
