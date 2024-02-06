import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { Client } from '@domain/entities/client/client.schema';
interface ICreateTransactionService {
    transaction: CreateTransactionDto;
    client: Client;
}
export declare class CreateTransactionService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute({ transaction, client, }: ICreateTransactionService): Promise<TransactionDocument>;
}
export {};
