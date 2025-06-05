import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadBreRuleResult } from './entities/lead_bre_rule_result.entity';
import { LeadsService } from 'src/leads/leads.service';
import { MasterBreCategory } from './entities/master_bre_category.entity';
import { BreRuleResultResponse } from './interfaces/bre-rule-result.interface';

@Injectable()
export class BreService {
  constructor(
    @InjectRepository(LeadBreRuleResult)
    private leadBreRuleResultRepository: Repository<LeadBreRuleResult>,
    @InjectRepository(MasterBreCategory)
    private masterBreCategoryRepository: Repository<MasterBreCategory>,
    private readonly leadsService: LeadsService
  ) {}

  async getMasterBreCategory(): Promise<MasterBreCategory[]> {
    return this.masterBreCategoryRepository
      .createQueryBuilder('MBC')
      .select(['MBC.m_bre_cat_id', 'MBC.m_bre_cat_name'])
      .orderBy('MBC.m_bre_cat_id', 'ASC')
      .getMany();
  }

  async getLeadBreRuleResult(leadId: number): Promise<BreRuleResultResponse> {
    const leadDetails = await this.leadsService.getLeadDetails(leadId);
    
    if(!leadDetails){
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    const leadBreRuleResult = await this.leadBreRuleResultRepository
      .createQueryBuilder('LBRR')
      .select([
        'LBRR.lbrr_id',
        'MBC.m_bre_cat_id',
        'MBC.m_bre_cat_name',
        'LBRR.lbrr_rule_name',
        'LBRR.lbrr_rule_cutoff_value', 
        'LBRR.lbrr_rule_actual_value',
        'LBRR.lbrr_rule_relevant_inputs',
        'LBRR.lbrr_rule_system_decision_id',
        'LBRR.lbrr_rule_manual_decision_id',
        'LBRR.lbrr_rule_manual_decision_remarks'
      ])
      .innerJoin('master_bre_rule', 'MBR', 'LBRR.lbrr_rule_id = MBR.m_bre_rule_id')
      .innerJoin('master_bre_category', 'MBC', 'MBR.m_bre_rule_catgory_id = MBC.m_bre_cat_id')
      .where('LBRR.lbrr_lead_id = :leadId', { leadId })
      .andWhere('LBRR.lbrr_active = :active', { active: 1 })
      .orderBy('MBC.m_bre_cat_id', 'ASC')
      .addOrderBy('LBRR.lbrr_rule_name', 'ASC')
      .getMany();

    const masterBreCategory = await this.getMasterBreCategory();

    return {
      leadBreRuleResult,
      masterBreCategory
    };
  }
}
