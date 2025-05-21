// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.findById(+id); // +id converts string to number
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // Login endpoint
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Payload can include minimal user info
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
