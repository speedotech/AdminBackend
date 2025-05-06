import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lead_followup')
export class LeadFollowup {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ length: 100, nullable: true })
  customer_id?: string;

  @Column({ type: 'bigint', unsigned: true })
  lead_id!: number;

  @Column({ unsigned: true, nullable: true })
  user_id?: number;

  @Column({ length: 500, nullable: true })
  remarks?: string;

  @Column({ length: 255, nullable: true })
  reason?: string;

  @Column({ length: 255, nullable: true })
  scheduled_date?: string;

  @Column({ length: 255, nullable: true })
  status?: string;

  @Column({ length: 20, nullable: true })
  stage?: string;

  @CreateDateColumn({ type: 'datetime' })
  created_on!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_on!: Date;

  @Column({ unsigned: true, nullable: true })
  lead_followup_status_id?: number;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  lead_followup_active!: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  lead_followup_deleted!: number;
}
