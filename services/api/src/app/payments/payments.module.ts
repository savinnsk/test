import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { TransactionsModule } from '@app/transactions/transactions.module';
import { PaymentsService } from './payments.service';
import transportConfig from '@common/config/transport.config';
import { CurrencyQuotesModule } from '@infra/currency-quotes/currency-quote.module';
import { CurrencyQuotesPort } from '@domain/ports/currency-quotes.port';
import { AwesomeapiAdapter } from '@infra/currency-quotes/awesomeapi/awesomeapi.service';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from '@app/products/products.module';
import { PlansModule } from '@app/plans/plans.module';

@Module({
  imports: [
    TransactionsModule,
    ClientsModule.registerAsync(transportConfig() as any),
    CurrencyQuotesModule,
    HttpModule,
    ProductsModule,
    PlansModule,
  ],
  providers: [
    PaymentsService,
    {
      provide: CurrencyQuotesPort,
      useClass: AwesomeapiAdapter,
    },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
