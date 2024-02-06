import { PayerInfosDoc } from '../payer';
import { CreditCardInfosDoc } from '../payments';
export declare class CreateSubscriptionDoc {
    paymentGateway: string;
    paymentMethod: string;
    planId: string;
    payer: PayerInfosDoc;
    creditCard: CreditCardInfosDoc;
}
