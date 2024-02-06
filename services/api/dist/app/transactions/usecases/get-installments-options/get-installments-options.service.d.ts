import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare class GetInstallmentsOptions {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(transactionId: string): Promise<TransactionDocument>;
}
