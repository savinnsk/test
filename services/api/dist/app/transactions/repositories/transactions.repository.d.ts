import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { Billet } from '@domain/entities/billet/billet.schema';
import { Pix } from '@domain/entities/pix/pix.schema';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare abstract class TransactionsRepository {
    abstract create(params: {
        transaction: CreateTransactionDto;
        id?: string;
    }): Promise<TransactionDocument>;
    abstract createInstance(params: {
        transaction: CreateTransactionDto & {
            client: any;
        };
    }): Promise<TransactionDocument> | any;
    abstract findAll(params?: PaginationRequest): Promise<PaginationResponse>;
    abstract findById(id: string): Promise<TransactionDocument | null>;
    abstract findByClient(client: string): Promise<TransactionDocument[]>;
    abstract findByTransactionId(params: {
        transactionId: string;
    }): Promise<TransactionDocument | null>;
    abstract findByPaymentGateway(params: {
        paymentGateway: string;
        transactionId: string;
    }): Promise<TransactionDocument | null>;
    abstract updateTransactionId(params: {
        id: string;
        transactionId: string;
    }): Promise<TransactionDocument>;
    abstract updateMetadata(params: {
        transactionId: string;
        metadata: any;
    }): Promise<TransactionDocument>;
    abstract updateStatus(params: {
        id: string;
        status: string;
    }): Promise<TransactionDocument>;
    abstract updatePixQrByTransactionId(params: {
        transactionId: string;
        pix: Pix;
    }): Promise<void>;
    abstract updateBilletByTransactionId(params: {
        transactionId: string;
        billet: Billet;
    }): Promise<void>;
    abstract update(params: {
        id: string;
        data: any;
    }): Promise<TransactionDocument>;
}
