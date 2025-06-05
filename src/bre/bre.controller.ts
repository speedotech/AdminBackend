import { Controller, Get, Post, Query, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { BreService } from './bre.service';
import { BreRuleResultResponse } from './interfaces/bre-rule-result.interface';
import { UpdateBreRuleResultDto } from './dtos/updateBreRuleResult.dto';

@Controller('bre')
@UsePipes(new ValidationPipe({ transform: true }))
export class BreController {
  constructor(private readonly breService: BreService) {}

  @Get('getBreRuleResult')
  getBreRuleResult(@Query('lead_id') leadId: number): Promise<BreRuleResultResponse> {
    return this.breService.getLeadBreRuleResult(leadId);
  }

  @Post('updateBreRuleResult')
  updateBreRuleResult(@Body() updateBreRuleResultDto: UpdateBreRuleResultDto){
    return this.breService.updateBreRuleResult(updateBreRuleResultDto);
  }
}
