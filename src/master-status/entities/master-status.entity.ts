import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('master_status')
export class MasterStatus {
  @PrimaryGeneratedColumn({ unsigned: true })
  status_id!: number;

  @Column({ length: 100 })
  status_name!: string;

  @Column({ length: 100 })
  status_stage!: string;

  @CreateDateColumn()
  created_on!: Date;

  @Column({ unsigned: true, default: 1 })
  status_active!: number;

  @Column({ unsigned: true, default: 0 })
  status_deleted!: number;

  @Column({ unsigned: true, nullable: true })
  status_order!: number;

  @Column({ length: 200 })
  status_customer_label!: string;
}
