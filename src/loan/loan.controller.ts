import { Body, Controller, Post, BadRequestException,UseGuards } from '@nestjs/common';
import { LoanService } from './loan.service';
import { FetchPayableAmountDto } from './dto/fetch-payable-amount.dto';
import { ApiKeyGuard } from '../api-key.guard';  // Adjust path if needed
import { ConfirmBbpsPaymentDto } from './dto/confirm-payment.dto';



@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('fetch-payable-amount')
  async fetchPayableAmount(@Body() body: FetchPayableAmountDto) {
    if (!body) {
      throw new BadRequestException('Payload is required');
    }
    if (!body.loan_account_no && !body.mobile) {
      throw new BadRequestException('Please provide loan account number');
    }
    return await this.loanService.getLoanByAccountOrMobile(body.loan_account_no, body.mobile);
  }


  @Post('bbps-payment')
  @UseGuards(ApiKeyGuard)  
  async confirmBbpsPaymentEndpoint(@Body() payload: ConfirmBbpsPaymentDto) {
    if (!payload) {
      throw new BadRequestException('Payload is required');
    }
    return await this.loanService.confirmBbpsPayment(payload);
  }
}

