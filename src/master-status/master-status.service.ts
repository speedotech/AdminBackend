import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterStatus } from './entities/master-status.entity';

@Injectable()
export class MasterStatusService {
  constructor(
    @InjectRepository(MasterStatus)
    private masterStatusRepository: Repository<MasterStatus>,
  ) {}

  async getActiveMasterStatuses() {
    return this.masterStatusRepository.find({ where: { status_active: 1 } });
  }

  async findStatusById(statusId: number) {
    return this.masterStatusRepository.findOne({
      where: { status_id: statusId, status_active: 1 },
    });
  }
}
