import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
export declare class UpdateTransactionService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(id: string, data: any): Promise<TransactionDocument>;
}
