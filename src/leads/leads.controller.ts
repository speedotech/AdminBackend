import { Controller, Get, Post, Put, Delete, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

@Controller('api/leads')
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('source') source?: string,
  ) {
    return this.leadsService.findAll(page, limit, { status, source });
  }

  @Get(':id')
  getOne(@Query('id') id: number) {
    return this.leadsService.findOne(id);
  }

  @Post()
  create(@Body() leadData: CreateLeadDto) {
    return this.leadsService.create(leadData);
  }

  @Put(':id')
  update(
    @Query('id') id: number,
    @Body() leadData: Partial<CreateLeadDto>,
  ) {
    return this.leadsService.update(id, leadData);
  }

  @Delete(':id')
  remove(@Query('id') id: number) {
    return this.leadsService.remove(id);
  }

  @Post('updateLeadStatus')
  updateLeadStatus(@Body() body: UpdateLeadStatusDto) {
    return this.leadsService.updateStatus(body);
  }
}
