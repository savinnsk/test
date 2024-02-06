import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class FindAllTransactionsService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute(params?: PaginationRequest): Promise<PaginationResponse>;
}
