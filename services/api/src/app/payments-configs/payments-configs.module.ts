import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import usecases from './usecases';

import {
  PaymentConfig,
  PaymentConfigSchema,
} from '@domain/entities/payment-config/payment-config';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentConfig.name, schema: PaymentConfigSchema },
    ]),
    DatabaseModule,
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class PaymentsConfigsModule {}
