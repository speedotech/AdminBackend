import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoanService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getLoanByAccountOrMobile(loanAccountNo?: string, mobile?: string) {
    if (!loanAccountNo && !mobile) {
      throw new BadRequestException('Please provide loan account number or mobile number');
    }

    const params = [];
    const whereConditions = [];

    if (loanAccountNo) {
      whereConditions.push('loan.loan_no = ?');
      params.push(loanAccountNo);
    }

    if (mobile) {
      whereConditions.push('lead_customer.mobile = ?');
      params.push(mobile);
    }

    const whereClause = whereConditions.join(' OR ');

    const query = `
      SELECT 
        loan.loan_no,
        CONCAT_WS(' ', lead_customer.first_name, lead_customer.middle_name, lead_customer.sur_name) AS customer_name,
        lead_customer.mobile,
        lead_customer.email,
        loan.loan_total_payable_amount AS emi_amount,
        loan.loan_total_outstanding_amount AS overdue_amount,
        loan.loan_closure_date AS bill_date,
        loan.loan_settled_date AS due_date,
        loan.loan_status_id AS loan_status,
        loan.product_id AS product,
        loan.loan_total_received_amount,
        loan.loan_principle_outstanding_amount,
        loan.loan_interest_outstanding_amount,
        loan.loan_penalty_outstanding_amount
      FROM loan
      JOIN leads ON loan.lead_id = leads.lead_id
      JOIN lead_customer ON leads.lead_customer_profile_id = lead_customer.customer_lead_id
      WHERE ${whereClause}
      LIMIT 1;
    `;

    const result = await this.connection.query(query, params);

    if (!result.length) {
      throw new NotFoundException(
        loanAccountNo
          ? `Loan account not found for loan number: ${loanAccountNo}`
          : `Loan account not found for given mobile number`,
      );
    }

    const ref_id = uuidv4();

    return {
      ref_id,
      loan_no: result[0].loan_no,
      customer_name: result[0].customer_name,
      mobile: result[0].mobile,
      email: result[0].email,
      emi_amount: result[0].emi_amount,
      overdue_amount: result[0].overdue_amount,
      bill_date: result[0].bill_date,
      due_date: result[0].due_date,
      loan_status: result[0].loan_status,
      product: result[0].product,
      total_received_amount: result[0].loan_total_received_amount,
      principle_outstanding: result[0].loan_principle_outstanding_amount,
      interest_outstanding: result[0].loan_interest_outstanding_amount,
      penalty_outstanding: result[0].loan_penalty_outstanding_amount,
      total_payable_amount: result[0].emi_amount,
    };
  }
}
