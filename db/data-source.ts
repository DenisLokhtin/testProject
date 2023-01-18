import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as path from 'path';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  entities: [__dirname + '/../**/*.entity.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
