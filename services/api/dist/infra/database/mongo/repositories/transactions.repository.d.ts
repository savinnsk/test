import { Model } from 'mongoose';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { Billet } from '@domain/entities/billet/billet.schema';
import { Pix } from '@domain/entities/pix/pix.schema';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class MongoTransactionsRepository implements TransactionsRepository {
    private readonly transactionModel;
    constructor(transactionModel: Model<TransactionDocument>);
    update(params: {
        id: string;
        data: any;
    }): Promise<TransactionDocument>;
    updateBilletByTransactionId(params: {
        transactionId: string;
        billet: Billet;
    }): Promise<void>;
    updatePixQrByTransactionId(params: {
        transactionId: string;
        pix: Pix;
    }): Promise<void>;
    updateMetadata(params: {
        transactionId: string;
        metadata: any;
    }): Promise<any>;
    create(params: {
        transaction: CreateTransactionDto;
    }): Promise<TransactionDocument>;
    createInstance(params: {
        transaction: CreateTransactionDto;
    }): Promise<TransactionDocument>;
    findAll(params?: PaginationRequest): Promise<PaginationResponse>;
    findById(id: string): Promise<TransactionDocument | null>;
    findByClient(client: string): Promise<TransactionDocument[]>;
    findByTransactionId(params: {
        transactionId: string;
    }): Promise<TransactionDocument | null>;
    findByPaymentGateway(params: {
        paymentGateway: string;
        transactionId: string;
    }): Promise<TransactionDocument>;
    updateTransactionId(params: {
        id: string;
        transactionId: string;
    }): Promise<TransactionDocument>;
    updateStatus(params: {
        id: string;
        status: string;
    }): Promise<TransactionDocument>;
}
