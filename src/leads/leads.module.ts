import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './entities/lead.entity';
import { MasterStatusModule } from '../master-status/master-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), MasterStatusModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
