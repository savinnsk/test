import { TransactionResponseDto } from '@domain/dtos/transaction-response.dto';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
export declare class TransactionMapper {
    static toJSON(transaction: TransactionDocument): TransactionResponseDto;
}
