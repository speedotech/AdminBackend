import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLeadStatusDto {
  @IsNotEmpty()
  @IsNumber()
  lead_id!: number;

  @IsNotEmpty()
  @IsNumber()
  lead_status_id!: number;

  @IsNotEmpty()
  @IsString()
  remark!: string;

  @IsNotEmpty()
  @IsNumber()
  user_id!: number;
}
