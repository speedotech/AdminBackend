import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    synchronize: configService.get('database.synchronize'),
    logging: configService.get('database.logging'),
    extra: {
      connectionLimit: 10,
    },
  };

  return config;
};
