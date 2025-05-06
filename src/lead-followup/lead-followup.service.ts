import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadFollowup } from './entities/lead-followup.entity';

@Injectable()
export class LeadFollowupService {
  constructor(
    @InjectRepository(LeadFollowup)
    private leadFollowupRepository: Repository<LeadFollowup>,
  ) {}

  async findAll(): Promise<LeadFollowup[]> {
    return this.leadFollowupRepository.find();
  }

  async createFollowUp(leadFollowup: LeadFollowup): Promise<LeadFollowup> {
    return this.leadFollowupRepository.save(leadFollowup);
  }
}
