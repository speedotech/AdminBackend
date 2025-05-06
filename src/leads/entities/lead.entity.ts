import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn({ unsigned: true })
  lead_id!: number;

  @Column({ length: 20, nullable: true })
  customer_id?: string;

  @Column({ unsigned: true, default: 1 })
  company_id!: number;

  @Column({ unsigned: true, default: 1 })
  product_id!: number;

  @Column({ length: 255, nullable: true })
  application_no?: string;

  @Column({ length: 20, nullable: true })
  loan_no?: string;

  @Column({ length: 100, nullable: true })
  purpose?: string;

  @Column({
    type: 'enum',
    enum: ['NEW', 'REPEAT', 'UNPAID-REPEAT'],
    nullable: true,
  })
  user_type?: 'NEW' | 'REPEAT' | 'UNPAID-REPEAT';

  @Column({ length: 50, nullable: true })
  first_name?: string;

  @Column({ unsigned: true, nullable: true })
  mobile?: number;

  @Column({ unsigned: true, default: 0, comment: '1=>verified' })
  lead_is_mobile_verified!: number;

  @Column({ length: 15, nullable: true })
  pancard?: string;

  @Column({ length: 150, nullable: true })
  email?: string;

  @Column({ nullable: true })
  otp?: number;

  @Column({ length: 150, nullable: true })
  alternate_email?: string;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  loan_amount?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  monthly_salary_amount?: number;

  @Column({ nullable: true })
  tenure?: number;

  @Column({ nullable: true })
  cibil?: number;

  @Column({ nullable: true })
  check_cibil_status?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  obligations?: number;

  @Column({ length: 15, nullable: true })
  promocode?: string;

  @Column({ length: 50, nullable: true })
  source?: string;

  @Column({ length: 255, nullable: true })
  city?: string;

  @Column({ unsigned: true, nullable: true })
  lead_branch_id?: number;

  @Column({ nullable: true })
  state_id?: number;

  @Column({ unsigned: true, nullable: true })
  city_id?: number;

  @Column({ unsigned: true, nullable: true })
  pincode?: number;

  @Column({ length: 255, nullable: true })
  term_and_condition?: string;

  @Column({ length: 150, nullable: true })
  coordinates?: string;

  @Column({ type: 'varchar', length: 100 })
  status!: string;

  @Column({ type: 'varchar', length: 10 })
  stage!: string;

  @Column({ unsigned: true, nullable: true })
  lead_status_id?: number;

  @Column({ length: 500, nullable: true })
  remark?: string;

  @Column({ length: 256, nullable: true })
  utm_source?: string;

  @Column({ length: 255, nullable: true })
  utm_campaign?: string;

  @Column({ length: 255, nullable: true })
  utm_medium?: string;

  @Column({ length: 255, nullable: true })
  utm_term?: string;

  @Column({ length: 255, nullable: true })
  utm_content?: string;

  @Column({ length: 255, nullable: true })
  ip?: string;

  @Column({ length: 255, nullable: true })
  imei_no?: string;

  @Column({
    unsigned: true,
    default: 0,
    comment: "0=>can't recommend, 1=>Can Recommend",
  })
  application_status!: number;

  @Column({ type: 'datetime', nullable: true })
  lead_application_created_on?: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_on!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_on?: Date;

  @Column({ length: 1, nullable: true, comment: 'Y=> yes' })
  qde_consent?: string;

  @Column({ unsigned: true, default: 1 })
  lead_active!: number;

  @Column({ unsigned: true, default: 0 })
  lead_deleted!: number;

  @Column({ type: 'date', nullable: true })
  lead_entry_date?: Date;

  @Column({ nullable: true })
  lead_data_source_id?: number;

  @Column({ unsigned: true, nullable: true })
  lead_fi_scm_residence_assign_user_id?: number;

  @Column({
    unsigned: true,
    nullable: true,
    comment: '1=>pending,2=>postive,3=>negative',
  })
  lead_fi_residence_status_id?: number;

  @Column({ unsigned: true, nullable: true })
  lead_fi_scm_office_assign_user_id?: number;

  @Column({
    unsigned: true,
    nullable: true,
    comment: '1=>pending,2=>postive,3=>negative',
  })
  lead_fi_office_status_id?: number;

  @Column({ length: 500, nullable: true })
  lead_mobile_android_id?: string;

  @Column({ unsigned: true, nullable: true })
  lead_fi_executive_residence_assign_user_id?: number;

  @Column({ unsigned: true, nullable: true })
  lead_fi_executive_office_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  schedule_time?: Date;

  @Column({ length: 15, nullable: true })
  lead_reference_no?: string;

  @Column({ nullable: true })
  lead_screener_call_user_id?: number;

  @Column({ default: 0 })
  lead_document_pending_status?: number;

  @Column({ unsigned: true, nullable: true })
  lead_screener_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_screener_assign_datetime?: Date;

  @Column({ type: 'datetime', nullable: true })
  lead_screener_recommend_datetime?: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  lead_credit_assign_user_id?: number | null;

  @Column({ type: 'datetime', nullable: true })
  lead_credit_assign_datetime?: Date;

  @Column({ type: 'datetime', nullable: true })
  lead_credit_recommend_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_credithead_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_credithead_assign_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_credit_approve_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_credit_approve_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_scm_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_scm_assign_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_cfe_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_cfe_assign_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_collection_executive_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_collection_executive_assign_datetime?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_closure_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_closure_assign_datetime?: Date;

  @Column({
    nullable: true,
    comment: '0=>Customer, 1=>Campaign, 2=> Self Model, 3=> Assisted Model',
  })
  lead_doable_to_application_status?: number;

  @Column({ type: 'datetime', nullable: true })
  scheduled_date?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_disbursal_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_disbursal_assign_datetime?: Date;

  @Column({ type: 'datetime', nullable: true })
  lead_disbursal_recommend_datetime?: Date;

  @Column({ nullable: true })
  lead_disbursal_approve_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_disbursal_approve_datetime?: Date;

  @Column({ type: 'date', nullable: true })
  lead_final_disbursed_date?: Date;

  @Column({ unsigned: true, nullable: true })
  lead_audit_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_audit_assign_date_time?: Date;

  @Column({ unsigned: true, default: 0 })
  audit_send_back!: number;

  @Column({ unsigned: true, nullable: true })
  lead_rejected_reason_id?: number;

  @Column({ unsigned: true, nullable: true })
  lead_rejected_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_rejected_datetime?: Date;

  @Column({ unsigned: true, default: 0 })
  lead_black_list_flag!: number;

  @Column({
    unsigned: true,
    default: 0,
    comment: 'Lead Straight-Through Processing',
  })
  lead_stp_flag!: number;

  @Column({ unsigned: true, nullable: true })
  lead_rejected_assign_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  lead_rejected_assign_datetime?: Date;

  @Column({ unsigned: true, default: 0 })
  lead_rejected_assign_counter!: number;

  @Column({ unsigned: true, nullable: true, comment: '1=>Web,2=>App' })
  lead_journey_type_id?: number;

  @Column({ unsigned: true, nullable: true, comment: 'master_journey_stage' })
  lead_journey_stage_id?: number;

  @Column({ nullable: true })
  eligibility?: number;

  @Column({ unsigned: true, nullable: true })
  lead_customer_profile_id?: number;
}
