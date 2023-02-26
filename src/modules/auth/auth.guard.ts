import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const [scheme, token] = request.headers.authorization.split(' ');

      if (!token || scheme !== 'Bearer') {
        throw new UnauthorizedException('Access token missing or bad scheme');
      }

      verify(token, process.env.JWT_SECRET_KEY);
      return true;
    } catch {
      throw new UnauthorizedException('Access token is invalid');
    }
  }
}
