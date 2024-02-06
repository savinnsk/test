import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
export declare class UpdateMetadataService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(transactionId: string, metadata: any): Promise<any>;
}
