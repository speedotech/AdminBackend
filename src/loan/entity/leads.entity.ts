import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('leads')
  export class Lead {
    @PrimaryGeneratedColumn({ unsigned: true })
    lead_id!: number;
  
    @Column({ type: 'bigint', unsigned: true , nullable: true})
    lead_customer_profile_id!: number;
  
    // add other columns as needed
  }
  