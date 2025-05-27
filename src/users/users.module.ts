// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret_key_here', // replace with a strong secret, or load from env variables
      signOptions: { expiresIn: '1h' }, // token expires in 1 hour
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
