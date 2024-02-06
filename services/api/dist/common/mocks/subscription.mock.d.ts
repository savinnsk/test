import { PaymentGateway, PaymentMethod } from '@app/payments/enums/payment.enum';
export declare const subscriptionMock: {
    paymentGateway: PaymentGateway;
    paymentMethod: PaymentMethod;
    planId: string;
    payer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        document: string;
        documentType: any;
        dateOfBirth: string;
        billingAddress: {
            street: string;
            number: number;
            neighborhood: string;
            city: string;
            state: string;
            country: string;
            zipCode: string;
        };
    };
    creditCard: {
        holderName: string;
        number: string;
        expirationMonth: number;
        expirationYear: number;
        cvv: string;
    };
};
