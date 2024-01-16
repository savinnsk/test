import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AwesomeapiAdapter } from './awesomeapi/awesomeapi.service';

@Module({
  imports: [HttpModule],
  providers: [AwesomeapiAdapter],
  exports: [AwesomeapiAdapter],
})
export class CurrencyQuotesModule {}
