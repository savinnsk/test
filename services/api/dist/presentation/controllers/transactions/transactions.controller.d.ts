import { Response } from 'express';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { FindAllTransactionsService } from '@app/transactions/usecases/find-all-transactions/find-all-transactions.service';
import { FindTransactionByIdService } from '@app/transactions/usecases/find-transaction-by-id/find-transaction-by-id.service';
import { FindTransactionsByClientService } from '@app/transactions/usecases/find-transactions-by-client/find-transactions-by-client-.service';
export declare class TransactionsController {
    private readonly findAllTransactionsService;
    private readonly findTransactionByIdService;
    private readonly findTransactionsByClientService;
    constructor(findAllTransactionsService: FindAllTransactionsService, findTransactionByIdService: FindTransactionByIdService, findTransactionsByClientService: FindTransactionsByClientService);
    findAll(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<TransactionDocument>;
    findByClient(client: string): Promise<TransactionDocument[]>;
}
