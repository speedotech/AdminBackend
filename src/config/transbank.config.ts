import { ConfigService } from '@nestjs/config';

export const getTransbankConfig = (configService: ConfigService) => ({
  entityId: configService.get<string>('ENTITY_ID'),
  programId: configService.get<string>('PROGRAM_ID'),
  token: configService.get<string>('TOKEN'),
  biller_id: configService.get<string>('BILLER_ID'),
  bbps_source: configService.get<string>('BBPS_SOURCE'),
  loan_account_no: configService.get<string>('LOAN_ACCOUNT_NO'),
  mobile: configService.get<string>('MOBILE'),
});
