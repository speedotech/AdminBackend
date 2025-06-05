import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BreRuleResultItem {
  @IsNumber()
  lbrr_id!: number;

  @IsNumber()
  lbrr_rule_system_decision_id!: number;

  @IsNumber()
  lbrr_rule_manual_decision_id!: number;
}

export class UpdateBreRuleResultDto {
  @IsNumber()
  lead_id!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BreRuleResultItem)
  breRuleResult!: BreRuleResultItem[];
}  