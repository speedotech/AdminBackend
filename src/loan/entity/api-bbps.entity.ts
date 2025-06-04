import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('api_bbps')
export class ApiBbps {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  entity_id!: string;

  @Column({ type: 'varchar', length: 50 })
  program_id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bbps_source?: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  biller_id?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ref_id?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  loan_account_no?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  customer_name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  vendor_name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  txn_ref_no?: string;

  @Column({ type: 'timestamp', nullable: true })
  txn_date?: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  txn_amt?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_channel?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_mode?: string;

  @Column({ type: 'int', nullable: true })
  status?: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @Column({ nullable: true })
  npciref?: string;

  @Column({ nullable: true })
  couref?: string;

  // 👉 Relation to Loan
  // @ManyToOne(() => Loan, (loan) => loan.bbps, { nullable: true })
  // @JoinColumn({ name: 'loan_account_no', referencedColumnName: 'loan_account_no' })
  // loan?: Loan;

  // 👉 Optional: Relation to Lead
  // @ManyToOne(() => Lead, (lead) => lead.bbps, { nullable: true })
  //   @JoinColumn({ name: 'ref_id', referencedColumnName: 'ref_id' })
  //   lead?: Lead;
}
