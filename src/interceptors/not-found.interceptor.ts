import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    {
      return next.handle().pipe(
        tap((data) => {
          if (data === undefined) {
            throw new NotFoundException();
          }
        }),
      );
    }
  }
}
