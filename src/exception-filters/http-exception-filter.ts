import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus?.() || 500;
    const message = exception.message;
    const path = request.url;
    const timestamp = new Date().toISOString();

    response.status(statusCode).json({
      statusCode,
      message,
      path,
      timestamp,
    });
  }
}
