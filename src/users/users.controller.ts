import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getUserByUserId')
  getUserByUserId(@Query('user_id') user_id: number) {
    return this.usersService.getUserByUserId(user_id);
  }
}
