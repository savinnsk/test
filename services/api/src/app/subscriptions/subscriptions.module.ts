import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import transportConfig from '@common/config/transport.config';
import {
  Subscription,
  SubscriptionSchema,
} from '@domain/entities/subscription/subscription.schema';
import { DatabaseModule } from '@infra/database/database.module';
import usecases from './usecases';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
    ]),
    DatabaseModule,
    ClientsModule.registerAsync(transportConfig() as any),
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class SubscriptionsModule {}
