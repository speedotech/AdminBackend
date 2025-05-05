import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { GetLeadStatusDto } from './dtos/getLeadStatus.dto';
import { MasterStatusService } from '../master-status/master-status.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    private readonly masterStatusService: MasterStatusService,
  ) {}

  // private async validateLeadExists(id: number): Promise<Lead> {
  //   const lead = await this.leadsRepository.findOne({ where: { lead_id: id } });
  //   if (!lead) {
  //     throw new NotFoundException(`Lead with ID ${id} not found`);
  //   }
  //   return lead;
  // }

  // private async validateEmailUnique(email: string, excludeId?: number): Promise<void> {
  //   const existingLead = await this.leadsRepository.findOne({
  //     where: { email, ...(excludeId && { id: excludeId }) },
  //   });
  //   if (existingLead) {
  //     throw new BadRequestException('Email already exists');
  //   }
  // }

  async getLeadStatusByLeadId(body: GetLeadStatusDto) {
    const [lead, masterStatus] = await Promise.all([
      this.leadsRepository.findOne({ where: { lead_id: body.lead_id } }),
      this.masterStatusService.getActiveMasterStatuses(),
    ]);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${body.lead_id} not found`);
    }

    if (!masterStatus || masterStatus.length === 0) {
      throw new NotFoundException(`Master Status not found`);
    }

    const leadStatus = masterStatus.find(
      (status) => status.status_id === lead.lead_status_id,
    );

    if (!leadStatus) {
      throw new NotFoundException(`Lead Status not found`);
    }

    return { lead, leadStatus, masterStatus };
  }
}
