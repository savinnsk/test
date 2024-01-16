import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import baseConfig from '@common/config/base.config';
import authConfig from '@common/config/auth.config';
import databaseConfig from '@infra/database/database.config';
import { HealthModule } from '@app/health/health.module';
import { PaymentsModule } from '@app/payments/payments.module';
import { TransactionsModule } from '@app/transactions/transactions.module';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { ClientsModule } from '@app/clients/clients.module';
import { CommonModule } from '@common/common.module';
import { DatabaseModule } from '@infra/database/database.module';
import { PresentationModule } from './presentation/presentation.module';
import { ProductsModule } from '@app/products/products.module';
import { PlansModule } from '@app/plans/plans.module';
import { SubscriptionsModule } from '@app/subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, baseConfig, authConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    DatabaseModule,
    PresentationModule,
    PaymentsModule,
    TransactionsModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    CommonModule,
    ProductsModule,
    PlansModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
