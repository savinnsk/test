import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare class FindTransactionsByClientService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(client: string): Promise<TransactionDocument[]>;
}
