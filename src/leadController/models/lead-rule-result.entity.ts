import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('lead_bre_rule_result')
export class LeadBreRuleResult {
  @PrimaryGeneratedColumn({ unsigned: true })
  lbrr_id!: number;

  @Column({ unsigned: true })
  lbrr_lead_id!: number;

  @Column({ unsigned: true })
  lbrr_rule_id!: number;

  @Column({ length: 200 })
  lbrr_rule_name!: string;

  @Column({ length: 500 })
  lbrr_rule_cutoff_value!: string;

  @Column({ length: 500 })
  lbrr_rule_actual_value!: string;

  @Column({ length: 500 })
  lbrr_rule_relevant_inputs!: string;

  @Column({ unsigned: true, default: 0, comment: '1=>Approved, 2=>Referred,3=>Rejected' })
  lbrr_rule_system_decision_id!: number;

  @Column({ unsigned: true, default: 0, comment: '1=>Approve, 2=>Refer,3=>Reject' })
  lbrr_rule_manual_decision_id!: number;

  @Column({ length: 1000, nullable: true })
  lbrr_rule_manual_decision_remarks?: string;

  @CreateDateColumn({ type: 'datetime' })
  lbrr_created_on!: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  lbrr_updated_on?: Date;

  @Column({ default: 1 })
  lbrr_active!: number;

  @Column({ default: 0 })
  lbrr_deleted!: number;
} 