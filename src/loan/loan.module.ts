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

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([Loan, Lead, LeadCustomer]), // <-- add this line
  ],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService],
})
export class LoanModule {}
