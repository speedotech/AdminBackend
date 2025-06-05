import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetBreRuleResultDto {
  @IsNotEmpty()
  @IsNumber()
  leadId!: number;
}