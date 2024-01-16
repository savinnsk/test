import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';

import { Plan, PlanSchema } from '@domain/entities/plan/plan.schema';
import { DatabaseModule } from '@infra/database/database.module';
import usecases from './usecases';
import transportConfig from '@common/config/transport.config';
import { ProductsModule } from '@app/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plan.name,
        schema: PlanSchema,
      },
    ]),
    DatabaseModule,
    ClientsModule.registerAsync(transportConfig() as any),
    ProductsModule,
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class PlansModule {}
