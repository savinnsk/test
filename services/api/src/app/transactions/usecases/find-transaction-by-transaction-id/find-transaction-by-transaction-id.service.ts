import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

@Injectable()
export class FindTransactionByTransactionIdService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(transactionId: string): Promise<TransactionDocument> {
    return await this.transactionsRepository.findByTransactionId({
      transactionId,
    });
  }
}
