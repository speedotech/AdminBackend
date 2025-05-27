import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';

// Import your entities here:
import { Loan } from './entity/loan.entity';
import { Lead } from './entity/leads.entity';
import { LeadCustomer } from './entity/lead_customer.entity';
import { Analysis } from './entity/redit_analysis_memo';
import { Collection } from './entity/collection.entity';
import { ApiBbps } from './entity/api-bbps.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      Loan,
      Lead,
      LeadCustomer,
      Analysis,
      Collection,
      ApiBbps,
    ]), // <-- add this line
  ],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService],
})
export class LoanModule {}
