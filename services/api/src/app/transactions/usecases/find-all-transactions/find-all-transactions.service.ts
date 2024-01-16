import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class FindAllTransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(params?: PaginationRequest): Promise<PaginationResponse> {
    try {
      return await this.transactionsRepository.findAll(params);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
