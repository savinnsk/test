import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

@Injectable()
export class UpdateTransactionIdService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(
    id: string,
    transactionId: string,
  ): Promise<TransactionDocument> {
    try {
      return await this.transactionsRepository.updateTransactionId({
        id,
        transactionId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
