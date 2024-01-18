declare const _default: {
    config: {
        key: string;
        publicKey: string;
    };
    data: {
        paymentGateway: string;
        amount: number;
        installments: number;
        currency: string;
        description: string;
        code: string;
        callbackUrl: string;
        payer: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            document: string;
            documentType: string;
            dateOfBirth: string;
            billingAddress: {
                street: string;
                number: number;
                neighborhood: string;
                city: string;
                state: string;
                country: string;
                zipCode: string;
                complement: string;
            };
        };
        paymentMethod: string;
        transactionId: string;
    };
};
export default _default;
