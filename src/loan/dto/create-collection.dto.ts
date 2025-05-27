import { IsOptional, IsString, IsNumber, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CollectionDto {
  @IsOptional()
  @IsNumber()
  old_recovery_id?: number;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsNumber()
  lead_id!: number;

  @IsOptional()
  @IsInt()
  company_id?: number;

  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsString()
  customer_id?: string;

  @IsString()
  loan_no!: string;

  @IsString()
  payment_mode!: string;

  @IsOptional()
  @IsInt()
  payment_mode_id?: number;

  @IsNumber()
  received_amount!: number;

  @IsOptional()
  @IsString()
  refrence_no?: string;

  @IsString()
  repayment_type!: string;

  @IsString()
  company_account_no!: string;

  @IsString()
  docs!: string;

  @IsNumber()
  discount!: number;

  @IsOptional()
  @IsNumber()
  refund?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_recived?: Date;

  @IsString()
  recovery_status!: string;

  @IsOptional()
  @IsInt()
  payment_verification?: number;

  @IsOptional()
  @IsNumber()
  sattlement?: number;

  @IsString()
  remarks!: string;

  @IsOptional()
  @IsString()
  noc?: string;

  @IsString()
  ip!: string;

  @Type(() => Date)
  @IsDate()
  collection_executive_payment_created_on!: Date;

  @IsOptional()
  @IsInt()
  collection_executive_user_id?: number;

  @IsOptional()
  @IsInt()
  closure_user_id?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  closure_payment_updated_on?: Date;

  @IsOptional()
  @IsString()
  closure_remarks?: string;

  @IsOptional()
  @IsString()
  collection_type?: string;

  @IsOptional()
  @IsInt()
  collection_active?: number;

  @IsOptional()
  @IsInt()
  collection_deleted?: number;
}
