import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { config } from 'dotenv';
import {
  accessSync,
  createWriteStream,
  mkdirSync,
  renameSync,
  statSync,
} from 'fs';
import { join } from 'path';

config();

const BYTES_IN_KB = 1024;

@Injectable()
export class LoggerService extends ConsoleLogger {
  private level: LogLevel;

  constructor(name: string) {
    super(name);
    this.level = (process.env.LOG_LEVEL as LogLevel) || 'error';
  }

  error(message: any, ...optionalParams: any[]): void {
    this.handle('error', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.handle('warn', message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): void {
    this.handle('log', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.handle('debug', message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    this.handle('verbose', message, ...optionalParams);
  }

  private handle(
    level: LogLevel,
    message: string,
    ...optionalParams: any[]
  ): void {
    if (level !== this.level) {
      return;
    }

    super[level](message, ...optionalParams);
    this.write(level, message);
  }

  private write(level: LogLevel, message: string): void {
    const dirPath = join(process.env.PWD, 'logs');
    const filePath = join(dirPath, `${level}.log`);
    const size = Number(process.env.LOG_SIZE || 10) * BYTES_IN_KB;

    try {
      accessSync(dirPath);
    } catch {
      mkdirSync(dirPath);
    }

    try {
      if (statSync(filePath).size >= size) {
        renameSync(
          filePath,
          join(dirPath, level, Date.now().toString(), '.log'),
        );
      }
    } catch {}

    const stream = createWriteStream(filePath, { flags: 'a' });
    stream.write(`${message}\n`);
  }
}
