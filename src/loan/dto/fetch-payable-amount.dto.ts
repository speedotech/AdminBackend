import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsInt,
  IsNumber,
  isInt,
} from 'class-validator';

export class FetchPayableAmountDto {
  @IsNotEmpty()
  @IsString()
  entityId!: string;

  @IsNotEmpty()
  @IsString() // You said programId is string content, not number
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

  // @IsNotEmpty()
  // @IsString()
  // ref_id!: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  mobile?: string;
}

export class FetchPayableAmountResponseDto {
  @IsNotEmpty()
  @IsString()
  ref_id!: string;

  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsNotEmpty()
  @IsString()
  customer_name!: string;

  @IsNotEmpty()
  @IsString()
  loan_account_no!: string;

  @IsNotEmpty()
  @IsNumber()
  emi_amt!: number;

  @IsNotEmpty()
  @IsNumber()
  overdue_amt!: number;

  @IsNotEmpty()
  @IsString()
  bill_date!: string;

  @IsNotEmpty()
  @IsString()
  due_date!: string;

  @IsNotEmpty()
  @IsInt()
  loan_status!: number;

  @IsNotEmpty()
  @IsString()
  lob!: string;

  @IsNotEmpty()
  @IsString()
  product!: string;

  @IsNotEmpty()
  @IsNumber()
  total_bill_amt!: number;

  @IsOptional()
  @IsNumber()
  principal_overdue?: number;

  @IsOptional()
  @IsNumber()
  charges_overdue?: number;

  @IsOptional()
  @IsNumber()
  interest_overdue?: number;

  @IsOptional()
  @IsNumber()
  penal_charges_overdue?: number;

  @IsOptional()
  @IsNumber()
  bounce_charges_overdue?: number;

  @IsOptional()
  @IsInt()
  status_code?: number;

  constructor(init?: Partial<FetchPayableAmountResponseDto>) {
    Object.assign(this, init);
  }
}

export class ErrorResponseDto {
  @IsInt()
  status_code!: Number;

  @IsString()
  error_code!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  constructor(init?: Partial<ErrorResponseDto>) {
    Object.assign(this, init);
  }
}
