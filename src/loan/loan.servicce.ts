import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Or, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmBbpsPaymentDto } from './dto/confirm-payment.dto';
import { LeadCustomer } from './entity/lead_customer.entity';
import { Loan } from './entity/loan.entity';
import { Lead } from './entity/leads.entity';
import { Analysis } from './entity/redit_analysis_memo';
import { Collection } from './entity/collection.entity';
import {
  ErrorResponseDto,
  FetchPayableAmountResponseDto,
} from './dto/fetch-payable-amount.dto';
// import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class LoanService {
  // constructor(@InjectConnection() private readonly connection: Connection) {}
  constructor(
    @InjectRepository(LeadCustomer)
    private leadCustomerRepository: Repository<LeadCustomer>,

    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,

    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,

    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,

    @InjectRepository(Collection)
    private CollectionRepository: Repository<Collection>,
  ) {}

  async getLoanByAccountOrMobile(loanAccountNo?: string, mobile?: string) {
    if (!loanAccountNo && !mobile) {
      throw new BadRequestException(
        'Please provide loan account number or mobile number',
      );
    }

    const loan: Loan | null = await this.loanRepository.findOne({
      where: [{ loan_no: loanAccountNo }],
    });

    if (loan && loan.loan_status_id === 0) {
      throw new BadRequestException('Loan account not found');
    }

    const lead: Lead | null = await this.leadsRepository.findOne({
      where: [{ lead_id: loan?.lead_id }],
    });

    let leadCustomer: LeadCustomer | null;
    if (mobile && mobile.length < 10) {
      leadCustomer = await this.leadCustomerRepository.findOne({
        where: [{ mobile: mobile }],
      });
    } else {
      leadCustomer = await this.leadCustomerRepository.findOne({
        where: [{ customer_lead_id: lead?.lead_customer_profile_id }],
      });
    }

    let ref_id = uuidv4();
    const response = new FetchPayableAmountResponseDto({
      ref_id: ref_id.toString(),
      customer_name:
        leadCustomer?.first_name +
        ' ' +
        leadCustomer?.middle_name +
        ' ' +
        leadCustomer?.sur_name,
      loan_account_no: loan?.loan_no, //*
      emi_amt: loan?.loan_principle_payable_amount, //*
      overdue_amt: loan?.loan_total_outstanding_amount, //* */
      bill_date: lead?.lead_final_disbursed_date?.toString(), //*
      // due_date: loan?.loan_settled_date?.toString(),
      loan_status: loan?.loan_status_id,
      lob: 'NBFC',
      product: loan?.product_id.toString(),
      total_bill_amt: loan?.loan_total_payable_amount,
      principal_overdue: 0,
      charges_overdue: 0,
      interest_overdue: loan?.loan_penalty_payable_amount,
      penal_charges_overdue: 0,
      bounce_charges_overdue: 0,
      status_code: 1,
    });

    return response;
  }

  async confirmBbpsPayment(payload: ConfirmBbpsPaymentDto): Promise<any> {
    try {
      const loan: Loan | null = await this.loanRepository.findOne({
        where: { loan_no: payload.loan_account_no },
      });

      // Step: Fetch first repayment date from Analysis memo
      const analysis = await this.analysisRepository.findOne({
        where: { lead_id: loan?.lead_id },
        order: { repayment_date: 'ASC' }, // In case of multiple entries
      });

      const repaymentStartDate = analysis?.repayment_date ?? null;

      //  Error handling is still needed, error messages should be as per BBPS documentation

      const leadCustomer: LeadCustomer | null =
        await this.leadCustomerRepository.findOne({
          where: { customer_lead_id: loan?.lead_id },
        });

      if (loan && leadCustomer) {
        /*
      we need to perform operations inside this block
      1. Check if the payment is already confirmed
      2. If not, confirm the payment
      3. Update the loan status and other details
      4. if user paid less than the total amount, update the the amount by substracting the amount received from total amount
      Return the response
      */
        let amountPaid = payload.txn_amt;
        let totalAmount = loan.loan_total_payable_amount;
        let payment_date = new Date(payload.txn_date);
        if (amountPaid < totalAmount) {
          let pending_amount = totalAmount - amountPaid;
          loan.loan_total_outstanding_amount = pending_amount;
        }
        loan.loan_total_received_amount = amountPaid;
        loan.loan_status_id = 1;
        loan.loan_settled_date = new Date(payment_date);
        await this.loanRepository.save(loan);

        return new FetchPayableAmountResponseDto({ status_code: 1 });
      } else {
        return new ErrorResponseDto({
          status_code: 2,
          error_code: 'AB102',
          message: 'Invalid Loan Account Number',
        });
      }
    } catch (error: any) {
      if (error.response) {
        throw new BadRequestException(
          error.response.data?.message || 'Payment confirmation failed',
        );
      }
      throw new BadRequestException(
        'Payment confirmation failed due to server error',
      );
    }
  }
}
