import { PayerInfosDoc } from '../payer';
export declare class PaymentMakeRequestDoc {
    paymentGateway: string;
    amount: number;
    currency: string;
    installments: number;
    description: string;
    code: string;
    callbackUrl: string;
    payer: PayerInfosDoc;
    paymentMethod: string;
}
