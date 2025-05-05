import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MasterStatusService } from './master-status.service';

@Controller('master-status')
@UsePipes(new ValidationPipe({ transform: true }))
export class MasterStatusController {
  constructor(private readonly masterStatusService: MasterStatusService) {}
}
