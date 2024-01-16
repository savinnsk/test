import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { Billet } from '@domain/entities/billet/billet.schema';

@Injectable()
export class UpdateBilletByTransactionIdService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(transactionId: string, billet: Billet): Promise<void> {
    return await this.transactionsRepository.updateBilletByTransactionId({
      transactionId,
      billet,
    });
  }
}
