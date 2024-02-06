import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { FindTransactionByIdService } from '../find-transaction-by-id/find-transaction-by-id.service';
export declare class UpdateTransactionStatusService {
    private readonly findTransactionByIdService;
    constructor(findTransactionByIdService: FindTransactionByIdService);
    execute(id: string, newStatus: string): Promise<TransactionDocument>;
}
