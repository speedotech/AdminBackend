// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  userId: number;
  username: string;
  password: string; // hashed password
  active?: boolean;  // optional active flag
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: '$2b$10$N9qo8uLOickgx2ZMRZo4i.E4Pn8Hv4Yux/0/HtS8f9V6uFJFJmFEi', // bcrypt hash of 'admin123'
      active: true,
    },
    {
      userId: 2,
      username: 'test',
      password: '$2b$10$zQH42j0kQyLo5I9hJroplOqoPnKkmcslLlfkIVI3jSUYfFkfZ3j3C', // bcrypt hash of 'test123'
      active: false,
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.userId === id);
  }

  async create(user: User): Promise<User> {
    // hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = {
      userId: this.users.length + 1,
      username: user.username,
      password: hashedPassword,
      active: true,  // default active on create
    };
    this.users.push(newUser);
    return newUser;
  }

  async findOne(userIdOrUsername: number | string): Promise<User | undefined> {
    if (typeof userIdOrUsername === 'number') {
      return this.users.find((user) => user.userId === userIdOrUsername);
    } else {
      return this.users.find((user) => user.username === userIdOrUsername);
    }
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findOne(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  // ADD THIS METHOD to fix your error
  async getActiveUsers(): Promise<User[]> {
    return this.users.filter(user => user.active);
  }
}
