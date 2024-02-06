import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { Pix } from '@domain/entities/pix/pix.schema';
export declare class UpdatePixQrByTransactionIdService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(transactionId: string, pix: Pix): Promise<void>;
}
