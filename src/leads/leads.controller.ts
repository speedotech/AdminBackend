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
import { UpdateLeadStatusDto } from './dtos/UpdateLeadStatus.dto';

@Controller('leads')
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('getLeadStatusByLeadId')
  getLeadStatusByLeadId(@Query('lead_id') lead_id: number) {
    return this.leadsService.getLeadStatusByLeadId(lead_id);
  }

  @Post('updateLeadStatus')
  updateLeadStatus(@Body() body: UpdateLeadStatusDto) {
    return this.leadsService.updateLeadStatus(body);
  }
}
