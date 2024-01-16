import { TransactionResponseDto } from '@domain/dtos/transaction-response.dto';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';

export class TransactionMapper {
  static toJSON(transaction: TransactionDocument): TransactionResponseDto {
    console.log(transaction);
    return {
      transactionId: transaction.transactionId,
      paymentGateway: transaction.paymentGateway,
      paymentMethod: transaction.paymentMethod,
      amount: transaction.amount,
      currency: transaction.currency,
      installments: transaction.installments,
      status: transaction.currentStatus,
    };
  }
}
