import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client } from '@nestjs/microservices';

import { User, UserSchema } from '@domain/entities/user/user.schema';
import {
  Transaction,
  TransactionSchema,
} from '@domain/entities/transaction/transaction.schema';
import { ClientSchema } from '@domain/entities/client/client.schema';
import { UsersRepository } from '@app/users/repositories/users.repository';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { MongoUsersRepository } from './mongo/repositories/users.repository';
import { MongoClientsRepository } from './mongo/repositories/clients.repository';
import { MongoTransactionsRepository } from './mongo/repositories/transactions.repository';
import { MongoPaymentsConfigsRepository } from './mongo/repositories/payments-configs.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import {
  PaymentConfig,
  PaymentConfigSchema,
} from '@domain/entities/payment-config/payment-config';
import {
  Product,
  ProductSchema,
} from '@domain/entities/product/product.schema';
import { ProductsRepository } from '@app/products/repositories/products.repository';
import { MongoProductsRepository } from './mongo/repositories/product.repository';
import { Plan, PlanSchema } from '@domain/entities/plan/plan.schema';
import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { MongoPlansRepository } from './mongo/repositories/plans.repository';
import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { MongoSubscriptionsRepository } from './mongo/repositories/subscriptions.repository';
import {
  Subscription,
  SubscriptionSchema,
} from '@domain/entities/subscription/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: PaymentConfig.name, schema: PaymentConfigSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
    {
      provide: PaymentsConfigsRepository,
      useClass: MongoPaymentsConfigsRepository,
    },
    {
      provide: ClientsRepository,
      useClass: MongoClientsRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: MongoTransactionsRepository,
    },
    {
      provide: ProductsRepository,
      useClass: MongoProductsRepository,
    },
    {
      provide: PlansRepository,
      useClass: MongoPlansRepository,
    },
    {
      provide: SubscriptionsRepository,
      useClass: MongoSubscriptionsRepository,
    },
  ],
  exports: [
    UsersRepository,
    PaymentsConfigsRepository,
    ClientsRepository,
    TransactionsRepository,
    ProductsRepository,
    PlansRepository,
    SubscriptionsRepository,
  ],
})
export class DatabaseModule {}
