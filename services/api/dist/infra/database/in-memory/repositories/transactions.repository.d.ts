/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { Billet } from '@domain/entities/billet/billet.schema';
import { Pix } from '@domain/entities/pix/pix.schema';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare class InMemoryTransactionsRepository implements TransactionsRepository {
    transactions: TransactionDocument[];
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
        id?: string;
    }): Promise<TransactionDocument>;
    createInstance(params: {
        transaction: CreateTransactionDto;
    }): Promise<TransactionDocument | any>;
    findAll(): Promise<{
        content: (import("mongoose").Document<unknown, any, import("@domain/entities/transaction/transaction.schema").Transaction> & import("@domain/entities/transaction/transaction.schema").Transaction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
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
