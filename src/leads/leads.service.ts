import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { MasterStatusService } from '../master-status/master-status.service';
import { UpdateLeadStatusDto } from './dtos/UpdateLeadStatus.dto';
import { UsersService } from '../users/users.service';
import { LeadFollowupService } from '../lead-followup/lead-followup.service';
import { LeadFollowup } from '../lead-followup/entities/lead-followup.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    private readonly masterStatusService: MasterStatusService,
    private readonly usersService: UsersService,
    private readonly leadFollowupService: LeadFollowupService,
  ) {}

  async getLeadStatusByLeadId(lead_id: number) {
    let [lead, masterStatus, activeUsers] = await Promise.all([
      this.leadsRepository.findOne({
        where: { lead_id },
        select: [
          'lead_id',
          'status',
          'stage',
          'lead_status_id',
          'remark',
          'lead_screener_assign_user_id',
        ],
      }),
      this.masterStatusService.getActiveMasterStatuses(),
      this.usersService.getActiveUsers(),
    ]);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${lead_id} not found`);
    }

    let userName: string | undefined = '';
    if (lead.lead_screener_assign_user_id) {
      const user = await this.usersService.findOne(
        lead.lead_screener_assign_user_id,
      );
      if (user) {
        userName = user.username;
      }
    }

    const userData = {
      user_id: lead.lead_screener_assign_user_id,
      user_name: userName,
    };

    if (!masterStatus || masterStatus.length === 0) {
      throw new NotFoundException(`Master Status not found`);
    }

    const leadStatus = masterStatus.find(
      (status) => status.status_id === lead.lead_status_id,
    );

    if (!leadStatus) {
      throw new NotFoundException(`Lead Status not found`);
    }

    return { lead, leadStatus, masterStatus, userData, activeUsers };
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
      throw new NotFoundException(
        `Lead Status with ID ${lead_status_id} not found`,
      );
    }

    if (user_id) {
      const user = await this.usersService.findOne(user_id);
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
    }

    if (masterStatus.status_name === 'LEAD-NEW') {
      lead.lead_screener_assign_user_id = user_id;
      lead.lead_credit_assign_user_id = null;
    } else if (
      masterStatus.status_name === 'APPLICATION-NEW' ||
      masterStatus.status_name === 'APPLICATION-INPROCESS'
    ) {
      lead.lead_credit_assign_user_id = user_id;
    }

    lead.lead_status_id = lead_status_id;
    lead.status = masterStatus.status_name;
    lead.stage = masterStatus.status_stage;
    lead.remark = remark;

    const leadFollowup = new LeadFollowup();
    leadFollowup.lead_id = lead_id;
    leadFollowup.user_id = 211;
    leadFollowup.lead_followup_status_id = masterStatus.status_id;
    leadFollowup.customer_id = lead.customer_id;
    leadFollowup.status = masterStatus.status_name;
    leadFollowup.stage = masterStatus.status_stage;
    leadFollowup.created_on = new Date();
    leadFollowup.updated_on = new Date();
    leadFollowup.remarks = remark;

    await Promise.all([
      this.leadFollowupService.createFollowUp(leadFollowup),
      this.leadsRepository.save(lead),
    ]);

    return { message: 'Lead status updated successfully' };
  }
}
