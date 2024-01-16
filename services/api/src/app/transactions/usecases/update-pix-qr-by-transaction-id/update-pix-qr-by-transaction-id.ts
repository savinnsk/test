import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { Pix } from '@domain/entities/pix/pix.schema';

@Injectable()
export class UpdatePixQrByTransactionIdService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(transactionId: string, pix: Pix): Promise<void> {
    return await this.transactionsRepository.updatePixQrByTransactionId({
      transactionId,
      pix,
    });
  }
}
