import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const options: DataSourceOptions = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.TYPEORM_ENTITIES],
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
} as DataSourceOptions;

const source = new DataSource(options);

export default source;
