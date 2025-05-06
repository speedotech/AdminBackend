import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './entities/lead.entity';
import { MasterStatusModule } from '../master-status/master-status.module';
import { UsersModule } from '../users/users.module';
import { LeadFollowupModule } from '../lead-followup/lead-followup.module';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead]),
    MasterStatusModule,
    UsersModule,
    LeadFollowupModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {
  constructor() {
    const logger = new Logger('LeadsModule');
    logger.log('LeadsModule initialized');
  }
}
