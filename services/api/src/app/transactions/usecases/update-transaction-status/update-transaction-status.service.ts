import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { FindTransactionByIdService } from '../find-transaction-by-id/find-transaction-by-id.service';

@Injectable()
export class UpdateTransactionStatusService {
  constructor(
    private readonly findTransactionByIdService: FindTransactionByIdService,
  ) {}

  // TODO: padronizar parametros das funçoes
  async execute(id: string, newStatus: string): Promise<TransactionDocument> {
    try {
      const transaction = await this.findTransactionByIdService.execute(id);
      const oldStatus = transaction.currentStatus;
      transaction.currentStatus = newStatus;
      transaction.statusLog.push({
        old: oldStatus,
        new: newStatus,
      });
      return await transaction.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
