import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { Billet } from '@domain/entities/billet/billet.schema';
export declare class UpdateBilletByTransactionIdService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(transactionId: string, billet: Billet): Promise<void>;
}
