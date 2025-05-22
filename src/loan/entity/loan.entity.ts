// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//   } from 'typeorm';
  
//   @Entity('loan')
//   export class Loan {
//     @PrimaryGeneratedColumn({ unsigned: true })
//     loan_id!: number;
  
//     @Column({ length: 50, unique: true })
//     loan_no!: string;
  
//     @Column({ type: 'bigint', unsigned: true })
//     lead_id!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_total_payable_amount!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_total_outstanding_amount!: number;
  
//     @Column({ type: 'datetime', nullable: true })
//     loan_closure_date?: Date;
  
//     @Column({ type: 'datetime', nullable: true })
//     loan_settled_date?: Date;
  
//     @Column({ type: 'int', unsigned: true, nullable: true })
//     loan_status_id!: number;
  
//     @Column({ type: 'int', unsigned: true, nullable: true })
//     product_id!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_total_received_amount!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_principle_outstanding_amount!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_interest_outstanding_amount!: number;
  
//     @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
//     loan_penalty_outstanding_amount!: number;
//   }






import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('loan')
export class Loan {
  @PrimaryGeneratedColumn({ unsigned: true })
  loan_id!: number;

  @Column({ type: 'mediumint', unsigned: true, default: 1 })
  company_id!: number;

  @Column({ type: 'mediumint', unsigned: true, default: 1 })
  product_id!: number;

  @Column({ type: 'bigint', unsigned: true })
  lead_id!: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  customer_id?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  loan_no?: string;

  @Column({ type: 'double', nullable: true })
  recommended_amount?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company_account_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  disburse_refrence_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  screenshot?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  remarks?: string;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'mediumint', unsigned: true, nullable: true })
  loan_status_id?: number;

  @Column({ type: 'text', nullable: true })
  loanAgreementLetter?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  loanAgreementRequest?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  agrementRequestedDate?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  loanAgreementResponse?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  agrementUserIP?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  agrementResponseDate?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  company_ac_no_no_use?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mode_of_payment?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  channel?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ip?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sms?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mail?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  created_on?: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  updated_by?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updated_on?: string;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  loan_active!: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  loan_deleted!: number;

  @Column({ type: 'mediumint', unsigned: true, nullable: true })
  loan_disbursement_bank_id?: number;

  @Column({ type: 'int', unsigned: true, nullable: true, comment: 'disbursement trans api status' })
  loan_disbursement_trans_status_id?: number;

  @Column({ type: 'datetime', nullable: true })
  loan_disbursement_trans_status_datetime?: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  loan_disbursement_trans_log_id?: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '1=>Online,2=>Offline' })
  loan_disbursement_payment_mode_id?: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '1=>IMPS,2=>NEFT' })
  loan_disbursement_payment_type_id?: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  loan_disburse_waive_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  loan_disburse_waive_datetime?: Date;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  loan_noc_letter_sent_status?: number;

  @Column({ type: 'datetime', nullable: true })
  loan_noc_letter_sent_datetime?: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  loan_noc_letter_sent_user_id?: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '1 => Collection Pending, 2 => Recovery Pending, 3 => Legal' })
  loan_recovery_status_id?: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '1=>active Loan;2=>Loan Closed' })
  loan_bureau_report_flag!: number;

  @Column({ type: 'datetime', nullable: true })
  loan_bureau_report_datetime?: Date;

  @Column({ type: 'double', default: 0 })
  loan_principle_payable_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_interest_payable_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_penalty_payable_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_principle_received_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_interest_received_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_penalty_received_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_principle_discount_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_interest_discount_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_penalty_discount_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_principle_outstanding_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_interest_outstanding_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_penalty_outstanding_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_total_payable_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_total_received_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_total_discount_amount!: number;

  @Column({ type: 'double', default: 0 })
  loan_total_outstanding_amount!: number;

  @Column({ type: 'date', nullable: true })
  loan_closure_date?: Date;

  @Column({ type: 'date', nullable: true })
  loan_settled_date?: Date;

  @Column({ type: 'date', nullable: true })
  loan_writeoff_date?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  loan_disbursal_letter?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  legal_notice_letter?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  loan_noc_settlement_letter?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  loan_noc_closing_letter?: string;

  @Column({ type: 'mediumint', unsigned: true, nullable: true })
  loan_noc_settled_letter_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  loan_noc_settled_letter_datetime?: Date;

  @Column({ type: 'mediumint', unsigned: true, nullable: true })
  loan_noc_closed_letter_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  loan_noc_closed_letter_datetime?: Date;

  @Column({ type: 'tinyint', default: 0 })
  loan_executive_reloan_flag!: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  loan_executive_reloan_remark?: string;

  @Column({ type: 'int', nullable: true })
  loan_executive_reloan_user_id?: number;

  @Column({ type: 'tinyint', nullable: true })
  loan_mmp_event_push_flag?: number;
}

  