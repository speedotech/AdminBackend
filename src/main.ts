import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import crypto from 'crypto';

import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Add request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });
    next();
  });

  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-Forwarded-For',
      'X-Forwarded-Proto',
    ],
  });

  app.use(
    compression({
      level: 6,
      threshold: 1024,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Log all registered routes for debugging
  const server = app.getHttpAdapter().getInstance();
  logger.log('Registered routes:');
  (server._router.stack as any[]).forEach((middleware: any) => {
    if (middleware.route) {
      // routes registered directly on the app
      logger.log(
        `${middleware.route.path} [${Object.keys(middleware.route.methods).join(', ')}]`,
      );
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach((handler: any) => {
        const route = handler.route;
        if (route) {
          logger.log(
            `${route.path} [${Object.keys(route.methods).join(', ')}]`,
          );
        }
      });
    }
  });
  if (!(global as any).crypto) {
    (global as any).crypto = crypto;
  }
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
