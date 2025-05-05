import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(user_id: number): Promise<User | null> {
    if (!user_id || isNaN(user_id)) {
      throw new BadRequestException('Invalid user_id provided');
    }
    return this.usersRepository.findOne({ where: { user_id }, select: ['user_id', 'user_name'] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  async getUserByUserId(user_id: number) {
    const userDetails = await this.usersRepository.findOne({ where: { user_id }, select: ['user_id', 'user_name'] });
    
    if(!userDetails) {
      throw new NotFoundException(`User not found`);
    }

    return userDetails;
  }
} 