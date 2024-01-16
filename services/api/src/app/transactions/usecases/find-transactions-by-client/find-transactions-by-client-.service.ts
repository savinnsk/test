import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

@Injectable()
export class FindTransactionsByClientService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(client: string): Promise<TransactionDocument[]> {
    try {
      return await this.transactionsRepository.findByClient(client);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
