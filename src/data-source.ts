// src/data-source.ts
import { DataSource } from 'typeorm';
import { ApiBbps } from './loan/entity/api-bbps.entity'; // Adjust the path as needed

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'aditi',
  password: 'Aditi@1996Strong!',
  database: 'agrim_qa',
  entities: [ApiBbps],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
