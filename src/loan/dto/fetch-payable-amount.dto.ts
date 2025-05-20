import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class FetchPayableAmountDto {
  @IsNotEmpty()
  @IsString()
  entityId!: string;

  @IsNotEmpty()
  @IsString()   // You said programId is string content, not number
  
  programId!: string;

  @IsNotEmpty()
  @IsString()
  token!: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 25)
  biller_id!: string;

  @IsNotEmpty()
  @IsString()
  bbps_source!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  loan_account_no!: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  mobile?: string;
}
