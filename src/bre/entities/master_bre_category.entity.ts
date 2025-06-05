import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('master_bre_category')
@Index(['m_bre_cat_active', 'm_bre_cat_deleted'])
export class MasterBreCategory {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  m_bre_cat_id?: number;

  @Column({ type: 'varchar', length: 200 })
  m_bre_cat_name?: string;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  m_bre_cat_active?: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  m_bre_cat_deleted?: number;
}
