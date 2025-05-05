import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterStatusService } from './master-status.service';
import { MasterStatus } from './entities/master-status.entity';
import { MasterStatusController } from './master-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterStatus])],
  controllers: [MasterStatusController],
  providers: [MasterStatusService],
  exports: [MasterStatusService],
})
export class MasterStatusModule {}
