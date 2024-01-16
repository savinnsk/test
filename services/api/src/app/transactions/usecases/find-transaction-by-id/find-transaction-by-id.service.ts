import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

@Injectable()
export class FindTransactionByIdService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(id: string): Promise<TransactionDocument> {
    try {
      return await this.transactionsRepository.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
