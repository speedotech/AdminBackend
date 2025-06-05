import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreController } from './bre.controller';
import { BreService } from './bre.service';
import { LeadBreRuleResult } from './entities/lead_bre_rule_result.entity';
import { MasterBreCategory } from './entities/master_bre_category.entity';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeadBreRuleResult, MasterBreCategory]),
    LeadsModule
  ],
  controllers: [BreController],
  providers: [BreService],
  exports: [BreService]
})
export class BreModule {}
