import { PayerInfosDoc } from '../payer';
import { CreditCardInfosDoc, StatusLogsInfosDoc } from '../payments';
export declare class TransactionsInfosDoc {
    paymentGateway: string;
    paymentMethod: string;
    amount: number;
    currency: string;
    installments: number;
    payer: PayerInfosDoc;
    creditCard: CreditCardInfosDoc;
    description: string;
    statusLog: StatusLogsInfosDoc;
    callbackUrl: string;
    client: string;
    currentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
