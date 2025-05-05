import { IsNumber } from 'class-validator';

export class GetLeadStatusDto {
  @IsNumber()
  lead_id!: number;
}
