declare const _default: {
    paymentGateway: string;
    amount: number;
    currency: string;
    installments: number;
    payer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        cpf: string;
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
    paymentMethod: string;
    creditCard: {
        holderName: string;
        number: string;
        expirationMonth: number;
        expirationYear: number;
        cvv: string;
    };
};
export default _default;
