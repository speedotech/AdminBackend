import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      port: this.configService.get<number>('PORT', 3000),
      dbHost: this.configService.get<string>('DB_HOST'),
      // Add other environment variables you want to check
    };
  }
}
