import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';

@Injectable()
export class UpdateMetadataService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(transactionId: string, metadata: any): Promise<any> {
    try {
      return await this.transactionsRepository.updateMetadata({
        transactionId,
        metadata,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
