import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LeadsModule } from './leads/leads.module';
import { HealthModule } from './health/health.module';
import { MasterStatusModule } from './master-status/master-status.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { databaseConfig } from './config/database.config';
import { Logger } from '@nestjs/common';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [
        '.env',
        `.env.${process.env.NODE_ENV || 'development'}`,
        'dist/.env',
      ],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
    //     limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
    //   },
    // ]),
    LeadsModule,
    HealthModule,
    MasterStatusModule,
    UsersModule,
    LoanModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const logger = new Logger('AppModule');
  }
}
