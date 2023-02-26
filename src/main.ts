import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http-exception-filter';
import { LoggerService } from './logger/logger.service';
import { AuthGuard } from './modules/auth/auth.guard';

config();

const port = process.env.PORT || '4000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new LoggerService('REST_HTTP');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  app.useLogger(logger);

  const docPath = resolve(__dirname, '..', 'doc', 'api.yaml');
  const docContent = await readFile(docPath, 'utf-8');
  const document = parse(docContent);
  SwaggerModule.setup('/doc', app, document);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught exception: ${err}. Origin: ${origin}.`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    process.exit(1);
  });

  await app.listen(port, () => console.log(`Server is running on ${port}`));
}
bootstrap();
