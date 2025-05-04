import { IsNumber, IsString, IsEnum } from 'class-validator';

export class UpdateLeadStatusDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsEnum(['new', 'contacted', 'qualified', 'lost'])
  status!: string;
} 