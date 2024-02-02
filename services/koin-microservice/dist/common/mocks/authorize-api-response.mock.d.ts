declare const _default: {
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
        transactionId: any;
        status: string;
        installmentOptions: {
            incomingPercentValue: number;
            fee: number;
            description: string;
            originalValue: string;
            valueResidueFeeTotal: string;
            orderValue: string;
            maxValueFee: string;
            paymentType: string;
            installments: number;
            valueFeeTotal: string;
            firstDueDate: string;
            hasIncoming: boolean;
            installmentValue: string;
            incomingValue: string;
        }[];
    };
};
export default _default;
