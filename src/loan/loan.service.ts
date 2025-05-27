import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmBbpsPaymentDto } from './dto/confirm-payment.dto';
import { LeadCustomer } from './entity/lead_customer.entity';
import { Loan } from './entity/loan.entity';
import { Lead } from './entity/leads.entity';
import { Analysis } from './entity/redit_analysis_memo';
import { Collection } from './entity/collection.entity';
import { ApiBbps } from './entity/api-bbps.entity';
import {
  ErrorResponseDto,
  FetchPayableAmountResponseDto,
} from './dto/fetch-payable-amount.dto';

@Injectable()
export class LoanService {
  private readonly apiBaseUrl: string;
  private readonly entityId: string;
  private readonly programId: string;

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
    private collectionRepository: Repository<Collection>,

    @InjectRepository(ApiBbps)
    private readonly apiBbpsRepository: Repository<ApiBbps>,

    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl =
      this.configService.get<string>('API_BASE_URL') ||
      'https://api.agrimuat.com/index.php';

    this.entityId =
      this.configService.get<string>('ENTITY_ID') ||
      '0d761b84-96ce-46de-9533-ba51b2d5a856';

    this.programId =
      this.configService.get<string>('PROGRAM_ID') || '42';
  }

  private async checkRefIdExists(ref_id: string): Promise<boolean> {
    const count = await this.apiBbpsRepository.count({
      where: { ref_id },
    });
    return count > 0;
  }

  private async createApiBbpsRecord(data: Partial<ApiBbps>): Promise<ApiBbps> {
    const record = this.apiBbpsRepository.create(data);
    return await this.apiBbpsRepository.save(record);
  }

  async getLoanByAccountOrMobile(
    loanAccountNo?: string,
    mobile?: string,
  ): Promise<FetchPayableAmountResponseDto> {
    if (!loanAccountNo && !mobile) {
      throw new BadRequestException(
        'Please provide loan account number or mobile number',
      );
    }

    const loan = await this.loanRepository.findOne({
      where: loanAccountNo ? { loan_no: loanAccountNo } : undefined,
    });

    if (!loan || loan.loan_status_id === 0) {
      throw new BadRequestException('Loan account not found');
    }

    const lead = await this.leadsRepository.findOne({
      where: { lead_id: loan.lead_id },
    });

    let leadCustomer: LeadCustomer | null = null;
    if (mobile && mobile.length >= 10) {
      leadCustomer = await this.leadCustomerRepository.findOne({
        where: { mobile },
      });
    } else if (lead) {
      leadCustomer = await this.leadCustomerRepository.findOne({
        where: { customer_lead_id: lead.lead_id },
      });
    }

    // Generate unique ref_id
    let ref_id = uuidv4();
    while (await this.checkRefIdExists(ref_id)) {
      ref_id = uuidv4();
    }

    const customerName = [
      leadCustomer?.first_name,
      leadCustomer?.middle_name,
      leadCustomer?.sur_name,
    ]
      .filter(Boolean)
      .join(' ');

    await this.createApiBbpsRecord({
      ref_id,
      loan_account_no: loan.loan_no,
      customer_name: customerName,
      entity_id: this.entityId,
      program_id: this.programId,
      status: 0,
    });

    return new FetchPayableAmountResponseDto({
      ref_id,
      customer_name: customerName,
      loan_account_no: loan.loan_no,
      emi_amt: loan.loan_principle_payable_amount,
      overdue_amt: loan.loan_total_outstanding_amount,
      bill_date: lead?.lead_final_disbursed_date?.toString(),
      status: lead?.status,
      lob: 'NBFC',
      product: loan.product_id?.toString(),
      total_bill_amt: loan.loan_total_payable_amount,
      principal_overdue: 0,
      charges_overdue: 0,
      interest_overdue: loan.loan_penalty_payable_amount,
      penal_charges_overdue: 0,
      bounce_charges_overdue: 0,
      status_code: 1,
    });
  }

  async confirmBbpsPayment(
    payload: ConfirmBbpsPaymentDto,
  ): Promise<any> {
    if (!payload.loan_account_no) {
      return new ErrorResponseDto({
        status_code: 2,
        error_code: 'AB101',
        message: 'Loan Account Number is required',
      });
    }

    if (!payload.ref_id) {
      return new ErrorResponseDto({
        status_code: 2,
        error_code: 'AB104',
        message: 'ref_id is required',
      });
    }

    const paymentRecord = await this.apiBbpsRepository.findOne({
      where: { ref_id: payload.ref_id },
    });

    if (!paymentRecord) {
      return new ErrorResponseDto({
        status_code: 409,
        message: `ref_id: ${payload.ref_id} does not exist, please first call fetch-payable-amount API.`,
      });
    }

    if (paymentRecord.status === 1) {
      return {
        status_code: 409,
        message: `Duplicate payment attempt for ref_id: ${payload.ref_id}`,
      };
    }

    const loan = await this.loanRepository.findOne({
      where: { loan_no: payload.loan_account_no },
    });

    if (!loan) {
      return new ErrorResponseDto({
        status_code: 2,
        error_code: 'AB102',
        message: 'Invalid Loan Account Number',
      });
    }

    const leadCustomer = await this.leadCustomerRepository.findOne({
      where: { customer_lead_id: loan.lead_id },
    });

    if (!leadCustomer) {
      return new ErrorResponseDto({
        status_code: 3,
        error_code: 'AB103',
        message: 'Lead Customer Not Found',
      });
    }

    const amountPaid = payload.txn_amt;
    const totalAmount = loan.loan_total_payable_amount;
    const paymentDate = new Date(payload.txn_date);

    loan.loan_total_outstanding_amount =
      amountPaid < totalAmount ? totalAmount - amountPaid : 0;
    loan.loan_total_received_amount =
      (loan.loan_total_received_amount || 0) + amountPaid;
    loan.loan_status_id = 1;
    loan.loan_settled_date = paymentDate;

    await this.loanRepository.save(loan);

    const lead = await this.leadsRepository.findOne({
      where: { lead_id: loan.lead_id },
    });

    if (lead) {
      if (amountPaid >= totalAmount) {
        lead.lead_status_id = 16;
        lead.stage = 'S16';
        lead.status = 'CLOSED';
      } else {
        lead.lead_status_id = 19;
        lead.stage = 'S16';
        lead.status = 'PART-PAYMENT';
      }
      await this.leadsRepository.save(lead);
    }

    paymentRecord.token = payload.token ?? undefined;
    paymentRecord.bbps_source = payload.bbps_source ?? undefined;
    paymentRecord.biller_id = payload.biller_id ?? undefined;
    paymentRecord.txn_ref_no = payload.txn_ref_no ?? undefined;
    paymentRecord.txn_date = paymentDate;
    paymentRecord.txn_amt = amountPaid;
    paymentRecord.payment_channel = payload.payment_channel ?? undefined;
    paymentRecord.payment_mode = payload.payment_mode ?? undefined;
    paymentRecord.npciref = payload.npciref ?? undefined;
    paymentRecord.couref = payload.couref ?? undefined;
    paymentRecord.status = 1; // Payment done

    await this.apiBbpsRepository.save(paymentRecord);

    return new FetchPayableAmountResponseDto({ status_code: 1 });
  }
}
