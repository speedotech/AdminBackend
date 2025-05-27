import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lead_customer')
export class LeadCustomer {
  @PrimaryGeneratedColumn({ unsigned: true })
  customer_lead_id!: number;

  @Column({ length: 100, nullable: true })
  first_name?: string;

  @Column({ length: 100, nullable: true })
  middle_name?: string;

  @Column({ length: 100, nullable: true })
  sur_name?: string;

  @Column({ length: 15, nullable: true })
  mobile?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  // add other columns as needed
}
