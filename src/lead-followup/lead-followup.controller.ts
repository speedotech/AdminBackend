import { Controller, Get } from '@nestjs/common';
import { LeadFollowupService } from './lead-followup.service';

@Controller('lead-followup')
export class LeadFollowupController {
  constructor(private readonly leadFollowupService: LeadFollowupService) {}

  @Get()
  findAll() {
    return this.leadFollowupService.findAll();
  }
}
