import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionStatus } from '@app/transactions/enums/status.enum';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { getLastFourChar } from '@helpers/functions/get-last-four-char';
import { Client } from '@domain/entities/client/client.schema';

interface ICreateTransactionService {
  transaction: CreateTransactionDto;
  client: Client;
}

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    transaction,
    client,
  }: ICreateTransactionService): Promise<TransactionDocument> {
    try {
      const createdTransaction =
        await this.transactionsRepository.createInstance({
          transaction: {
            ...transaction,
            client,
          },
        });

      if (createdTransaction.creditCard) {
        createdTransaction.creditCard.lastFourNumbers = getLastFourChar(
          transaction.creditCard.number,
        );

        createdTransaction.creditCard.bin =
          transaction.creditCard.number.substring(0, 6);
      }

      createdTransaction.currentStatus = TransactionStatus.created;
      createdTransaction.statusLog.push({
        old: null,
        new: TransactionStatus.created,
      });

      return await createdTransaction.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
