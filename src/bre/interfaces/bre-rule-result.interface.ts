import { LeadBreRuleResult } from '../entities/lead_bre_rule_result.entity';
import { MasterBreCategory } from '../entities/master_bre_category.entity';

export interface BreRuleResultResponse {
  leadBreRuleResult: LeadBreRuleResult[];
  masterBreCategory: MasterBreCategory[];
} 