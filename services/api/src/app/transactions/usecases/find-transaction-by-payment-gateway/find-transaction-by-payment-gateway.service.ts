import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

interface IFindTransactionByPaymentGatewayService {
  paymentGateway: string;
  transactionId: string;
}

@Injectable()
export class FindTransactionByPaymentGatewayService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    paymentGateway,
    transactionId,
  }: IFindTransactionByPaymentGatewayService): Promise<TransactionDocument> {
    try {
      return await this.transactionsRepository.findByPaymentGateway({
        paymentGateway,
        transactionId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
