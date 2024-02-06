import { Currency, PaymentGateway, PaymentMethod } from '@app/payments/enums/payment.enum';
export declare class TransactionResponseDto {
    transactionId?: string;
    paymentGateway: PaymentGateway;
    paymentMethod: PaymentMethod;
    amount: number;
    currency: Currency;
    installments: number;
    status?: string;
}
