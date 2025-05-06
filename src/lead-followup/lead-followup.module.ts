import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadFollowup } from './entities/lead-followup.entity';
import { LeadFollowupService } from './lead-followup.service';
import { LeadFollowupController } from './lead-followup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeadFollowup])],
  providers: [LeadFollowupService],
  controllers: [LeadFollowupController],
  exports: [LeadFollowupService],
})
export class LeadFollowupModule {}
