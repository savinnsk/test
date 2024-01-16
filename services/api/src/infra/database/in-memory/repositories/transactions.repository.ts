import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { Billet } from '@domain/entities/billet/billet.schema';
import { Pix } from '@domain/entities/pix/pix.schema';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemoryTransactionsRepository implements TransactionsRepository {
  transactions: TransactionDocument[] = [];

  async update(params: {
    id: string;
    data: any;
  }): Promise<TransactionDocument> {
    const currentTransaction = this.transactions.find(
      (x) => x.id === params.id,
    );

    if (!currentTransaction) return null;

    Object.assign(currentTransaction, { ...params.data });

    delete currentTransaction.save;
    delete (currentTransaction as any).createdAt;
    delete (currentTransaction as any).updatedAt;

    return currentTransaction;
  }

  async updateBilletByTransactionId(params: {
    transactionId: string;
    billet: Billet;
  }): Promise<void> {
    const currentTransaction = this.transactions.find(
      (x) => x.transactionId === params.transactionId,
    );

    Object.assign(currentTransaction, { billet: params.billet });
  }

  async updatePixQrByTransactionId(params: {
    transactionId: string;
    pix: Pix;
  }): Promise<void> {
    const currentTransaction = this.transactions.find(
      (x) => x.transactionId === params.transactionId,
    );

    Object.assign(currentTransaction, { pix: params.pix });
  }

  async updateMetadata(params: {
    transactionId: string;
    metadata: any;
  }): Promise<any> {
    const currentTransaction = this.transactions.find(
      (x) => x.transactionId === params.transactionId,
    );

    Object.assign(currentTransaction, { metadata: params.metadata });
  }

  async create(params: {
    transaction: CreateTransactionDto;
    id?: string;
  }): Promise<TransactionDocument> {
    const transaction = {
      id: params.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      statusLog: [],
      save: function () {
        delete this.save;
        return this;
      },
      ...params.transaction,
    } as any as TransactionDocument;

    this.transactions.push(transaction);
    return transaction;
  }

  async createInstance(params: {
    transaction: CreateTransactionDto;
  }): Promise<TransactionDocument | any> {
    const transaction = {
      ...params.transaction,
      id: randomUUID(),
      statusLog: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      save: function () {
        delete this.save;
        return this;
      },
    };

    return transaction;
  }

  async findAll() {
    return {
      content: this.transactions,
    };
  }

  async findById(id: string): Promise<TransactionDocument | null> {
    return (
      this.transactions.find((transaction) => transaction.id === id) ?? null
    );
  }

  async findByClient(client: string): Promise<TransactionDocument[]> {
    return this.transactions.filter(
      (transaction) => transaction.client._id.toString() === client,
    );
  }

  async findByTransactionId(params: {
    transactionId: string;
  }): Promise<TransactionDocument | null> {
    return (
      this.transactions.find(
        (transaction) => transaction.transactionId === params.transactionId,
      ) ?? null
    );
  }

  async findByPaymentGateway(params: {
    paymentGateway: string;
    transactionId: string;
  }): Promise<TransactionDocument> {
    // console.log(this.transactions);
    return (
      this.transactions.find(
        (transaction) =>
          transaction.transactionId === params.transactionId &&
          transaction.paymentGateway === params.paymentGateway,
      ) ?? null
    );
  }

  async updateTransactionId(params: {
    id: string;
    transactionId: string;
  }): Promise<TransactionDocument> {
    const currentTransaction = this.transactions.find(
      (x) => x.id === params.id,
    );

    Object.assign(currentTransaction, { transactionId: params.transactionId });

    return currentTransaction;
  }

  async updateStatus(params: {
    id: string;
    status: string;
  }): Promise<TransactionDocument> {
    const currentTransaction = this.transactions.find(
      (x) => x.id === params.id,
    );

    Object.assign(currentTransaction, { status: params.status });

    return currentTransaction;
  }
}
