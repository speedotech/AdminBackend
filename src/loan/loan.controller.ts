import {
  Body,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { FetchPayableAmountDto } from './dto/fetch-payable-amount.dto';
import { ConfirmBbpsPaymentDto } from './dto/confirm-payment.dto';
import { ConfigService } from '@nestjs/config';

@Controller('loan')
export class LoanController {
  constructor(
    private readonly loanService: LoanService,
    private readonly configService: ConfigService,
  ) {}

  @Post('fetch-payable-amount')
  async fetchPayableAmount(
    @Body() body: FetchPayableAmountDto,
    @Headers('api-key') apiKey: string, // Get API key from headers
  ) {
    if (!body) {
      throw new BadRequestException('Payload is required');
    }

    if (!body.loan_account_no && !body.mobile) {
      throw new BadRequestException('Please provide loan account number');
    }

    const isValid = this.validateCredentials(
      body.entityId,
      body.programId,
      body.token,
      body.biller_id,
      body.bbps_source,
      apiKey, // ✅ pass apiKey to validation
    );

    if (!isValid) {
      throw new BadRequestException('Invalid credentials provided');
    }

    return await this.loanService.getLoanByAccountOrMobile(
      body.loan_account_no,
      body.mobile,
    );
  }

  @Post('bbps-payment')
  @HttpCode(200)
  async confirmBbpsPaymentEndpoint(
    @Body() payload: ConfirmBbpsPaymentDto,
    @Headers('api-key') apiKey: string, // Get API key from headers
  ) {
    if (!payload) {
      throw new BadRequestException('Payload is required');
    }

    const isValid = this.validateCredentials(
      payload.entityId,
      payload.programId,
      payload.token,
      payload.biller_id,
      payload.bbps_source,
      apiKey, // ✅ pass apiKey to validation
    );

    if (!isValid) {
      throw new BadRequestException('Invalid credentials provided');
    }

    return await this.loanService.confirmBbpsPayment(payload);
  }

  private validateCredentials(
    entityId: string,
    programId: string,
    token: string,
    billerId: string,
    bbpsSource: string,
    apiKey: string,
  ): boolean {
    return (
      entityId === this.configService.get<string>('ENTITY_ID') &&
      programId === this.configService.get<string>('PROGRAM_ID') &&
      token === this.configService.get<string>('TOKEN') &&
      billerId === this.configService.get<string>('BILLER_ID') &&
      bbpsSource === this.configService.get<string>('BBPS_SOURCE') &&
      apiKey?.trim() === this.configService.get<string>('API_KEY')?.trim() // ✅ final check
    );
  }
}
