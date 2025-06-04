import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Length,
  IsOptional,
} from 'class-validator';

export class ConfirmBbpsPaymentDto {
  @IsNotEmpty()
  @IsString()
  entityId!: string;

  @IsNotEmpty()
  @IsString()
  programId!: string;

  // @IsNotEmpty()
  // @IsString()
  // api_key!: string;

  @IsNotEmpty()
  @IsString()
  token!: string;

  @IsNotEmpty()
  @IsString()
  bbps_source!: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 25)
  biller_id!: string;

  @IsNotEmpty()
  @IsString()
  ref_id!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  loan_account_no!: string;

  @IsNotEmpty()
  @IsString()
  customer_name!: string;

  @IsNotEmpty()
  @IsString()
  vendor_name!: string;

  @IsNotEmpty()
  @IsString()
  txn_ref_no!: string;

  @IsNotEmpty()
  @IsString()
  txn_date!: string;

  @IsNotEmpty()
  @IsNumber()
  txn_amt!: number;

  @IsNotEmpty()
  @IsString()
  payment_channel!: string;

  @IsNotEmpty()
  @IsString()
  payment_mode!: string;

  @IsNotEmpty()
  @IsInt()
  status!: number;

  @IsOptional()
  @IsString()
  npciref?: string;

  @IsOptional()
  @IsString()
  couref?: string;
}

export class Analysis {
  @IsOptional()
  @IsString()
  repayment_date?: string;
}

export class FetchPayableAmountResponseDto {
  @IsNotEmpty()
  @IsNumber()
  status_code!: number;

  @IsOptional()
  @IsString()
  repayment_date?: string;
}
