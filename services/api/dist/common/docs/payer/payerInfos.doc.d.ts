import { BillingAddressInfosDoc } from '../address';
export declare class PayerInfosDoc {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    document: string;
    documentType: string;
    dateOfBirth: Date;
    billingAddress: BillingAddressInfosDoc;
}
