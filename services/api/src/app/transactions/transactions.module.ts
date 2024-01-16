import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Transaction,
  TransactionSchema,
} from '@domain/entities/transaction/transaction.schema';
import usecases from './usecases';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    DatabaseModule,
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class TransactionsModule {}
