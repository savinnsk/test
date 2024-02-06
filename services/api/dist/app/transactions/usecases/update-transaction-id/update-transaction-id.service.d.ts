import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare class UpdateTransactionIdService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(id: string, transactionId: string): Promise<TransactionDocument>;
}
