import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsInt,
  IsNumber,
} from 'class-validator';

export class FetchPayableAmountDto {
  @IsNotEmpty()
  @IsString()
  entityId!: string;

  @IsNotEmpty()
  @IsString()
  programId!: string;

  @IsNotEmpty()
  @IsString()
  token!: string;

  // @IsNotEmpty()
  // @IsString()
  // api_key! :string;

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
  @IsNumber({}, { message: 'emi_amt must be a number' })
  emi_amt!: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'overdue_amt must be a number' })
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
  @IsNumber({}, { message: 'total_bill_amt must be a number' })
  total_bill_amt!: number;

  @IsOptional()
  @IsNumber({}, { message: 'principal_overdue must be a number' })
  principal_overdue?: number;

  @IsOptional()
  @IsNumber({}, { message: 'charges_overdue must be a number' })
  charges_overdue?: number;

  @IsOptional()
  @IsNumber({}, { message: 'interest_overdue must be a number' })
  interest_overdue?: number;

  @IsOptional()
  @IsNumber({}, { message: 'penal_charges_overdue must be a number' })
  penal_charges_overdue?: number;

  @IsOptional()
  @IsNumber({}, { message: 'bounce_charges_overdue must be a number' })
  bounce_charges_overdue?: number;

  @IsOptional()
  @IsInt()
  status_code?: number;

  // Newly added fields
  @IsOptional()
  @IsNumber({}, { message: 'total_payable_amount must be a number' })
  total_payable_amount?: number;

  @IsOptional()
  @IsNumber({}, { message: 'amount_paid must be a number' })
  amount_paid?: number;

  @IsOptional()
  @IsNumber({}, { message: 'outstanding_amount must be a number' })
  outstanding_amount?: number;

  @IsOptional()
  @IsString()
  current_status?: string;

  @IsOptional()
  @IsNumber({}, { message: 'loan_interest_payable_amount must be a number' })
  loan_interest_payable_amount?: number;

  constructor(init?: Partial<FetchPayableAmountResponseDto>) {
    Object.assign(this, init);
  }
}

export class ErrorResponseDto {
  @IsInt()
  status_code!: number;

  @IsString()
  error_code!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  constructor(init?: Partial<ErrorResponseDto>) {
    Object.assign(this, init);
  }
}
