import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('loan')
  export class Loan {
    @PrimaryGeneratedColumn({ unsigned: true })
    loan_id!: number;
  
    @Column({ length: 50, unique: true })
    loan_no!: string;
  
    @Column({ type: 'bigint', unsigned: true })
    lead_id!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_total_payable_amount!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_total_outstanding_amount!: number;
  
    @Column({ type: 'datetime', nullable: true })
    loan_closure_date?: Date;
  
    @Column({ type: 'datetime', nullable: true })
    loan_settled_date?: Date;
  
    @Column({ type: 'int', unsigned: true, nullable: true })
    loan_status_id!: number;
  
    @Column({ type: 'int', unsigned: true, nullable: true })
    product_id!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_total_received_amount!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_principle_outstanding_amount!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_interest_outstanding_amount!: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loan_penalty_outstanding_amount!: number;
  }
  