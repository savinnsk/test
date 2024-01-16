import { Module } from '@nestjs/common';
import { UsersModule } from '@app/users/users.module';
import { ClientsModule as MyClientModule } from '@app/clients/clients.module';
import { HealthModule } from '@app/health/health.module';
import { AuthModule } from '@app/auth/auth.module';
import controllers from './controllers';
import { PaymentsModule } from '@app/payments/payments.module';
import { TransactionsModule } from '@app/transactions/transactions.module';
import { HttpModule } from '@nestjs/axios';
import messages from './messages';
import { ClientsModule } from '@nestjs/microservices';
import transportConfig from '@common/config/transport.config';
import { CurrencyQuotesPort } from '@domain/ports/currency-quotes.port';
import { AwesomeapiAdapter } from '@infra/currency-quotes/awesomeapi/awesomeapi.service';
import { ProductsModule } from '@app/products/products.module';
import { PlansModule } from '@app/plans/plans.module';
import { SubscriptionsModule } from '@app/subscriptions/subscriptions.module';
import { PublicKeysModule } from '@app/public-keys/public-keys.module';

@Module({
  controllers: [...controllers, ...messages],
  imports: [
    PaymentsModule,
    MyClientModule,
    UsersModule,
    HealthModule,
    AuthModule,
    HttpModule,
    TransactionsModule,
    ProductsModule,
    PlansModule,
    SubscriptionsModule,
    PublicKeysModule,
    ClientsModule.registerAsync(transportConfig() as any),
  ],
  providers: [
    {
      provide: CurrencyQuotesPort,
      useClass: AwesomeapiAdapter,
    },
  ],
})
export class PresentationModule {}
