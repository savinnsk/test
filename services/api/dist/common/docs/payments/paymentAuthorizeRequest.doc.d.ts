import { PayerInfosDoc } from '../payer';
import { CreditCardInfosDoc } from '../payments';
export declare class PaymentAuthorizeRequestDoc {
    paymentGateway: string;
    amount: number;
    currency: string;
    installments: number;
    description: string;
    code: string;
    callbackUrl: string;
    payer: PayerInfosDoc;
    paymentMethod: string;
    creditCard: CreditCardInfosDoc;
}
