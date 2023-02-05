import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';

config();

const port = process.env.PORT || '4000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const docPath = resolve(__dirname, '..', 'doc', 'api.yaml');
  const docContent = await readFile(docPath, 'utf-8');
  const document = parse(docContent);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(port, () => console.log(`Server is running on ${port}`));
}
bootstrap();
