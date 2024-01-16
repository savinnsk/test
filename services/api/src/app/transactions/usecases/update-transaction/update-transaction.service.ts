import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';

@Injectable()
export class UpdateTransactionService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(id: string, data: any): Promise<TransactionDocument> {
    try {
      const result = await this.transactionsRepository.update({ id, data });

      if (!result) {
        throw new NotFoundException('Transaction not found');
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
