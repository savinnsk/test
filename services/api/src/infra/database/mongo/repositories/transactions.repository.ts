import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { Billet } from '@domain/entities/billet/billet.schema';
import { Pix } from '@domain/entities/pix/pix.schema';
import {
  Transaction,
  TransactionDocument,
} from '@domain/entities/transaction/transaction.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class MongoTransactionsRepository implements TransactionsRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async update(params: {
    id: string;
    data: any;
  }): Promise<TransactionDocument> {
    return this.transactionModel.findByIdAndUpdate(params.id, params.data);
  }

  async updateBilletByTransactionId(params: {
    transactionId: string;
    billet: Billet;
  }): Promise<void> {
    await this.transactionModel
      .updateOne(
        { transactionId: params.transactionId },
        {
          $set: { billet: params.billet },
        },
      )
      .exec();
  }

  async updatePixQrByTransactionId(params: {
    transactionId: string;
    pix: Pix;
  }): Promise<void> {
    await this.transactionModel
      .updateOne(
        { transactionId: params.transactionId },
        {
          $set: { pix: params.pix },
        },
      )
      .exec();
  }

  async updateMetadata(params: {
    transactionId: string;
    metadata: any;
  }): Promise<any> {
    return await this.transactionModel
      .updateOne(
        { transactionId: params.transactionId },
        {
          $set: { metadata: params.metadata },
        },
      )
      .exec();
  }

  async create(params: {
    transaction: CreateTransactionDto;
  }): Promise<TransactionDocument> {
    return await this.transactionModel.create(params.transaction);
  }

  async createInstance(params: {
    transaction: CreateTransactionDto;
  }): Promise<TransactionDocument> {
    return new this.transactionModel({
      ...params.transaction,
    });
  }

  async findAll(params?: PaginationRequest): Promise<PaginationResponse> {
    const total = await this.transactionModel.countDocuments();

    if (!params.page) {
      params.limit = total;
      params.page = 1;
    }

    const transactions = await this.transactionModel
      .find()
      .limit(params.limit * 1)
      .skip((params.page - 1) * params.limit)
      .exec();

    return {
      content: transactions,
      total_items: total,
      page: params.page,
    };
  }

  async findById(id: string): Promise<TransactionDocument | null> {
    return await this.transactionModel.findById(id).populate('client').exec();
  }

  async findByClient(client: string): Promise<TransactionDocument[]> {
    return await this.transactionModel.find({ client }).exec();
  }

  async findByTransactionId(params: {
    transactionId: string;
  }): Promise<TransactionDocument | null> {
    return await this.transactionModel
      .findOne({ transactionId: params.transactionId })
      .exec();
  }

  async findByPaymentGateway(params: {
    paymentGateway: string;
    transactionId: string;
  }): Promise<TransactionDocument> {
    return await this.transactionModel
      .findOne({
        paymentGateway: params.paymentGateway,
        transactionId: params.transactionId,
      })
      .exec();
  }

  async updateTransactionId(params: {
    id: string;
    transactionId: string;
  }): Promise<TransactionDocument> {
    return await this.transactionModel
      .findByIdAndUpdate(params.id, {
        transactionId: params.transactionId,
      })
      .exec();
  }

  async updateStatus(params: {
    id: string;
    status: string;
  }): Promise<TransactionDocument> {
    return await this.transactionModel
      .findByIdAndUpdate(params.id, {
        status: params.status,
      })
      .exec();
  }
}
