import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lead_bre_rule_result')
export class LeadBreRuleResult {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  lbrr_id?: number;

  @Column({ type: 'bigint', unsigned: true })
  lbrr_lead_id?: number;

  @Column({ type: 'int', unsigned: true })
  lbrr_rule_id?: number;

  @Column({ type: 'varchar', length: 200 })
  lbrr_rule_name?: string;

  @Column({ type: 'varchar', length: 500 })
  lbrr_rule_cutoff_value?: string;

  @Column({ type: 'varchar', length: 500 })
  lbrr_rule_actual_value?: string;

  @Column({ type: 'varchar', length: 500 })
  lbrr_rule_relevant_inputs?: string;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '1=>Approved, 2=>Referred,3=>Rejected' })
  lbrr_rule_system_decision_id?: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '1=>Approve, 2=>Refer,3=>Reject' })
  lbrr_rule_manual_decision_id?: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  lbrr_rule_manual_decision_remarks?: string;

  @Column({ type: 'datetime' })
  lbrr_created_on?: Date;

  @Column({ type: 'datetime', nullable: true })
  lbrr_updated_on?: Date;

  @Column({ type: 'tinyint', default: 1 })
  lbrr_active?: boolean;

  @Column({ type: 'tinyint', default: 0 })
  lbrr_deleted?: boolean;
}
