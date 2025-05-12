import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
    return this.usersRepository.findOne({
      where: { user_id },
      select: ['user_id', 'user_name', 'name'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getUserByUserId(user_id: number) {
    const userDetails = await this.usersRepository.findOne({
      where: { user_id },
      select: ['user_id', 'user_name'],
    });

    if (!userDetails) {
      throw new NotFoundException(`User not found`);
    }

    return userDetails;
  }

  async getActiveUsers() {
    const activeUsers = await this.usersRepository.find({
      where: {
        user_active: 1,
        labels: In(['CR1', 'CR2', 'CR3', 'DS1', 'DS2']),
      },
      select: ['user_id', 'name'],
    });
    return activeUsers;
  }
}
