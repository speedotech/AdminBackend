import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  user_id!: number;

  @Column({ length: 50, nullable: true })
  user_name?: string;

  @Column({ unsigned: true, default: 1 })
  company_id!: number;

  @Column({ unsigned: true, default: 1 })
  product_id!: number;

  @Column({ unsigned: true })
  role_id!: number;

  @Column({ length: 100 })
  labels!: string;

  @Column({ length: 255 })
  role!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ unsigned: true })
  mobile!: number;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 50, nullable: true })
  gender?: string;

  @Column({ length: 50, nullable: true })
  dob?: string;

  @Column({ length: 50, nullable: true })
  marital_status?: string;

  @Column({ length: 50, nullable: true })
  father_name?: string;

  @Column({ length: 255, nullable: true })
  branch?: string;

  @Column({ length: 100, nullable: true })
  center?: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'InActive', 'Closed', 'Blocked'],
    default: 'Active'
  })
  status!: string;

  @Column({ nullable: true })
  otp?: number;

  @Column({ length: 255, nullable: true })
  last_activity?: string;

  @Column({ default: 1 })
  is_Active!: number;

  @Column({ length: 20, nullable: true })
  ip?: string;

  @Column({ unsigned: true, nullable: true })
  created_by?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_on!: Date;

  @Column({ unsigned: true, nullable: true })
  user_scm_id?: number;

  @Column({ unsigned: true, default: 1 })
  user_active!: number;

  @Column({ unsigned: true, default: 0 })
  user_deleted!: number;

  @Column({ unsigned: true, nullable: true })
  updated_by?: number;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_on!: Date;

  @Column({ nullable: true })
  user_last_login_datetime?: Date;

  @Column({ length: 150, nullable: true })
  user_dialer_id?: string;

  @Column({ unsigned: true, default: 1, comment: '1=>"Active", 2=>"InActive", 3=>"Closed", 4=>"Blocked"' })
  user_status_id!: number;

  @Column({ unsigned: true, nullable: true, comment: '1=> Below Inc 50K, 2=> Above 50K' })
  user_allocation_type_id?: number;

  @Column({ default: 0 })
  call_assigned!: number;

  @Column({ unsigned: true, default: 0 })
  user_is_loanwalle!: number;

  @Column({ length: 50, nullable: true })
  user_last_login_ip?: string;

  @Column({ unsigned: true, default: 0 })
  user_total_login_count!: number;

  @Column({ default: 0 })
  user_logins_failed_count!: number;

  @Column({ nullable: true })
  user_last_password_reset_datetime?: Date;

  @Column({ unsigned: true, default: 0, comment: '1=>Yes,0=>No' })
  user_login_allow_time_status!: number;

  @Column({ nullable: true })
  user_login_allow_start_time?: Date;

  @Column({ nullable: true })
  user_login_allow_end_time?: Date;

  @Column({ length: 255, nullable: true })
  user_token?: string;
} 