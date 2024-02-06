import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
interface IFindTransactionByPaymentGatewayService {
    paymentGateway: string;
    transactionId: string;
}
export declare class FindTransactionByPaymentGatewayService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    execute({ paymentGateway, transactionId, }: IFindTransactionByPaymentGatewayService): Promise<TransactionDocument>;
}
export {};
