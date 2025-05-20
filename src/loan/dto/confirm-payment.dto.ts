import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty()
  txn_ref_no: string = '';

  @IsString()
  @IsNotEmpty()
  txn_date: string = '';

  @IsString()
  @IsNotEmpty()
  amount: string = '';

  @IsString()
  @IsNotEmpty()
  channel: string = '';

  @IsString()
  @IsNotEmpty()
  mode: string = '';

  @IsString()
  @IsNotEmpty()
  payment_type: string = '';

  @IsString()
  @IsNotEmpty()
  ref_id: string = '';

  @IsString()
  @IsNotEmpty()
  mobile: string = '';

  @IsString()
  @IsNotEmpty()
  outlet_id: string = '';
}
