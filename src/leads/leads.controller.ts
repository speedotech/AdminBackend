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
import { LeadsService } from './leads.service';
import { GetLeadStatusDto } from './dtos/getLeadStatus.dto';

@Controller('api/leads')
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('getLeadStatusByLeadId')
  getLeadStatusByLeadId(@Body() body: GetLeadStatusDto) {
    return this.leadsService.getLeadStatusByLeadId(body);
  }
}
