import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { body, method, originalUrl, params } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `${new Date().toISOString()} | ${method}: ${originalUrl} | ${statusCode} | BODY: ${JSON.stringify(
          body,
        )} | PARAMS: ${JSON.stringify(params)}`,
      );
    });

    next();
  }
}
