import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BreService } from './bre.service';
import { BreRuleResultResponse } from './interfaces/bre-rule-result.interface';

@Controller('bre')
@UsePipes(new ValidationPipe({ transform: true }))
export class BreController {
  constructor(private readonly breService: BreService) {}

  @Get('getBreRuleResult')
  getBreRuleResult(@Query('lead_id') leadId: number): Promise<BreRuleResultResponse> {
    return this.breService.getLeadBreRuleResult(leadId);
  }
}
