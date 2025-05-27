import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { FetchPayableAmountDto } from './dto/fetch-payable-amount.dto';
import { ApiKeyGuard } from '../api-key.guard'; // Adjust path if needed
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('fetch-payable-amount')
  async fetchPayableAmount(@Body() body: FetchPayableAmountDto) {
    const data = await this.loanService.getLoanByAccountOrMobile(
      body.loan_account_no,
      body.mobile,
    );

    return {
      ref_id: data.ref_id,
      customer_name: data.customer_name,
      loan_account_no: data.loan_no,
      emi_amt: data.emi_amount,
      overdue_amt: data.overdue_amount,
      bill_date: data.bill_date,
      due_date: data.due_date,
      loan_status: data.loan_status,
      product: data.product,
      total_bill_amt: data.loan_total_payable_amount,
      principal_overdue: data.loan_principle_outstanding_amount,
      charges_overdue: null,
      interest_overdue: data.loan_interest_outstanding_amount,
      penal_charges_overdue: data.loan_penalty_outstanding_amount,
      bounce_charges_overdue: null,
      status_code: 1,
    };
  }

  @Post('bbps-payment')
  @UseGuards(ApiKeyGuard)
  async confirmBbpsPaymentEndpoint(@Body() payload: any) {
    if (!payload) {
      throw new BadRequestException('Payload is required');
    }
    console.log(payload);
    return await this.loanService.confirmBbpsPayment(payload);
  }
}
