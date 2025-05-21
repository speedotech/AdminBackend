import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ConfirmBbpsPaymentDto {
  @IsNotEmpty()
  @IsString()
  transactionId!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
