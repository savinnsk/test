import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Client, ClientSchema } from '@domain/entities/client/client.schema';
import usecases from './usecases';
import { DatabaseModule } from '@infra/database/database.module';
import { PaymentsConfigsModule } from '@app/payments-configs/payments-configs.module';
import {
  PaymentConfig,
  PaymentConfigSchema,
} from '@domain/entities/payment-config/payment-config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: PaymentConfig.name, schema: PaymentConfigSchema },
    ]),
    DatabaseModule,
    PaymentsConfigsModule,
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class ClientsModule {}
