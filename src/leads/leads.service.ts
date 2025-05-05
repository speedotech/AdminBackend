import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { MasterStatusService } from '../master-status/master-status.service';
import { UpdateLeadStatusDto } from './dtos/UpdateLeadStatus.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    private readonly masterStatusService: MasterStatusService,
    private readonly usersService: UsersService
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

  async getLeadStatusByLeadId(lead_id: number) {
    let [lead, masterStatus] = await Promise.all([
      this.leadsRepository.findOne({ 
        where: { lead_id },
        select: ['lead_id','status', 'stage', 'lead_status_id', 'remark', 'lead_screener_assign_user_id']
      }),
      this.masterStatusService.getActiveMasterStatuses(),
    ]);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${lead_id} not found`);
    }

    let userName : string | undefined = '';
    if(lead.lead_screener_assign_user_id) {
      const user = await this.usersService.findOne(lead.lead_screener_assign_user_id);
      if(user) {
        userName = user.user_name;
      }
    }

    const userData = {
      user_id: lead.lead_screener_assign_user_id,
      user_name: userName,
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

    return { lead, leadStatus, masterStatus, userData };
  }

  async updateLeadStatus(body: UpdateLeadStatusDto) {
    const { lead_id, lead_status_id, remark, user_id } = body;

    const [lead, masterStatus] = await Promise.all([
      this.leadsRepository.findOne({ where: { lead_id } }),
      this.masterStatusService.findStatusById(lead_status_id),
    ]);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${lead_id} not found`);
    }

    if (!masterStatus) {
      throw new NotFoundException(`Lead Status with ID ${lead_status_id} not found`);
    }

    lead.lead_status_id = lead_status_id;
    lead.remark = remark;
    lead.status = masterStatus.status_name;
    lead.stage = masterStatus.status_stage;
    lead.lead_credit_assign_user_id = user_id;
    lead.lead_screener_assign_user_id = user_id;

    await this.leadsRepository.save(lead);

  }
}
