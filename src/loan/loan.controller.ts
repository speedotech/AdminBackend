import { Body, Controller, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { FetchPayableAmountDto } from './dto/fetch-payable-amount.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('fetch-payable-amount')
  async fetchPayableAmount(@Body() body: FetchPayableAmountDto) {
    const data = await this.loanService.getLoanByAccountOrMobile(body.loan_account_no, body.mobile);

    return {
      ref_id: data.ref_id,               // get ref_id from service response
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
      charges_overdue: null,             // add these if you want later
      interest_overdue: data.loan_interest_outstanding_amount,
      penal_charges_overdue: data.loan_penalty_outstanding_amount,
      bounce_charges_overdue: null,
      status_code: 1,
    };
  }
}
