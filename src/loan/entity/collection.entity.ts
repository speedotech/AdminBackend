import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('collection')
export class Collection {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  old_recovery_id?: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  user_id?: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  lead_id?: number;

  @Column({ type: 'mediumint', unsigned: true, nullable: true, default: 1 })
  company_id?: number;

  @Column({ type: 'mediumint', unsigned: true, nullable: true, default: 1 })
  product_id?: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  customer_id?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  loan_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payment_mode?: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  payment_mode_id?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  received_amount?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refrence_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  repayment_type?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  company_account_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  docs?: string;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  discount?: number;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  refund?: number;

  @Column({ type: 'date', nullable: true })
  date_of_recived?: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  recovery_status?: string;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    default: 0,
    comment: '0=Pending, 1=Approved, 2=Reject',
  })
  payment_verification?: number;

  @Column({
    type: 'double',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  sattlement?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remarks?: string;

  @Column({ type: 'varchar', length: 10, nullable: true, default: '0' })
  noc?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ip?: string;

  @Column({ type: 'datetime', nullable: true })
  collection_executive_payment_created_on?: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  collection_executive_user_id?: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  closure_user_id?: number;

  @Column({ type: 'datetime', nullable: true })
  closure_payment_updated_on?: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  closure_remarks?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '0=collection default,1=collection new,2=collection reschedule',
  })
  collection_type?: string;

  @Column({ type: 'int', unsigned: true, nullable: true, default: 1 })
  collection_active?: number;

  @Column({ type: 'int', unsigned: true, nullable: true, default: 0 })
  collection_deleted?: number;
}
