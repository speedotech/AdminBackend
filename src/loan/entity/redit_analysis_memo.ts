import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('redit_analysis_memo') // Replace with your actual table name
export class Analysis {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'bigint' })
  cam_id!: number;

  @Column({ type: 'mediumint', unsigned: true, default: 1 })
  company_id!: number;

  @Column({ type: 'mediumint', unsigned: true, default: 1 })
  product_id!: number;

  @Column({ type: 'bigint', unsigned: true })
  lead_id!: number;

  @Column({ length: 50, nullable: true })
  customer_id?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  user_id?: number;

  @Column({ length: 50, nullable: true })
  ntc?: string;

  @Column({ length: 50, nullable: true })
  run_other_pd_loan?: string;

  @Column({ length: 50, nullable: true })
  delay_other_loan_30_days?: string;

  @Column({ length: 50, nullable: true })
  job_stability?: string;

  @Column({ length: 5, nullable: true })
  city_category?: string;

  @Column({ length: 50, nullable: true })
  salary_credit1?: string;

  @Column({ length: 50, nullable: true })
  salary_credit1_date?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  salary_credit1_amount?: number;

  @Column({ length: 50, nullable: true })
  salary_credit2?: string;

  @Column({ length: 50, nullable: true })
  salary_credit2_date?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  salary_credit2_amount?: number;

  @Column({ length: 50, nullable: true })
  salary_credit3?: string;

  @Column({ length: 50, nullable: true })
  salary_credit3_date?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  salary_credit3_amount?: number;

  @Column({ length: 50, nullable: true })
  next_pay_date?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  median_salary?: number;

  @Column({ length: 50, nullable: true })
  salary_variance?: string;

  @Column({ length: 50, nullable: true })
  salary_on_time?: string;

  @Column({ length: 50, nullable: true })
  borrower_age?: string;

  @Column({ length: 50, nullable: true })
  end_use?: string;

  @Column({ type: 'float', nullable: true })
  eligible_foir_percentage?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  eligible_loan?: number;

  @Column({ type: 'int', nullable: true })
  loan_recommended?: number;

  @Column({ type: 'float', nullable: true })
  final_foir_percentage?: number;

  @Column({ length: 50, nullable: true })
  foir_enhanced_by?: string;

  @Column({ type: 'float', nullable: true })
  processing_fee_percent?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  roi?: number;

  @Column({ type: 'double', nullable: true, comment: 'pf with gst' })
  admin_fee?: number;

  @Column({ type: 'date', nullable: true })
  disbursal_date?: string;

  @Column({ type: 'date', nullable: true })
  repayment_date?: string;

  @Column({ type: 'double', nullable: true, comment: 'calculated GST' })
  adminFeeWithGST?: number;

  @Column({ type: 'double', nullable: true, comment: 'net pf without gst' })
  total_admin_fee?: number;

  @Column({ type: 'int', nullable: true })
  tenure?: number;

  @Column({ type: 'double', nullable: true })
  net_disbursal_amount?: number;

  @Column({ type: 'double', nullable: true })
  repayment_amount?: number;

  @Column({ type: 'float', nullable: true })
  panel_roi?: number;

  @Column({ length: 50, nullable: true })
  b2b_disbursal?: string;

  @Column({ type: 'int', nullable: true })
  b2b_number?: number;

  @Column({ length: 50, nullable: true })
  deviationsApprovedBy?: string;

  @Column({
    type: 'mediumint',
    unsigned: true,
    nullable: true,
    comment: `'0'=>'Not Recommend or Sanction', '1'=>'Recommend or Sanction'`,
  })
  cam_status?: number;

  @Column({ length: 500, nullable: true })
  remark?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  created_by?: number;

  @Column({ type: 'datetime' })
  created_at!: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  updated_by?: number;

  @Column({ type: 'datetime', nullable: true })
  updated_at?: Date;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  cam_active!: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  cam_deleted!: number;

  @Column({ length: 150, nullable: true })
  cam_sanction_letter_file_name?: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 0,
    nullable: true,
    comment: '1=>aadhaar eSign',
  })
  cam_sanction_letter_esgin_type_id?: number;

  @Column({ length: 150, nullable: true })
  cam_sanction_letter_esgin_file_name?: string;

  @Column({ length: 255, nullable: true })
  cam_esgin_audit_trail_file_name?: string;

  @Column({ type: 'datetime', nullable: true })
  cam_sanction_letter_esgin_on?: Date;

  @Column({ length: 20, nullable: true })
  cam_sanction_letter_ip_address?: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0, nullable: true })
  cam_sanction_letter_esgin_count?: number;

  @Column({ length: 10, nullable: true })
  cam_risk_profile?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  cam_risk_score?: number;

  @Column({ type: 'double', unsigned: true, nullable: true, default: 0 })
  cam_advance_interest_amount?: number;

  @Column({ type: 'double', nullable: true, default: 0 })
  cam_appraised_obligations?: number;

  @Column({ type: 'double', nullable: true, default: 0 })
  cam_appraised_monthly_income?: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    default: 0,
    comment: '1=>Yes,0=>No',
  })
  cam_blacklist_removed_flag?: number;

  @Column({ length: 500, nullable: true })
  cam_sanction_remarks?: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  cam_processing_fee_gst_type_id!: number; // 1=>Inclusive,2=>Exclusive
}
