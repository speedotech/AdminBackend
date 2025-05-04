import { IsString, IsEmail, IsPhoneNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsEnum(['new', 'contacted', 'qualified', 'lost'])
  status!: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  notes?: string;
} 