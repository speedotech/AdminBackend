import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.database'),
  synchronize: configService.get('database.synchronize'),
  logging: configService.get('database.logging'),
  ssl: configService.get('database.ssl') ? { rejectUnauthorized: false } : false,
  extra: {
    connectionLimit: 10,
  },
});
