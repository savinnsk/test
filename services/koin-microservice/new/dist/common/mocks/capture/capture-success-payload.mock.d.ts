declare const _default: {
    data: {
        _id: string;
        paymentGateway: string;
        paymentMethod: string;
        amount: number;
        currency: string;
        installments: number;
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
                _id: string;
            };
            _id: string;
        };
        billet: {
            instructions: string;
            due_at: string;
            interest: {
                days: number;
                type: string;
                amount: string;
            };
            fine: {
                days: number;
                type: string;
                amount: string;
            };
            _id: string;
        };
        description: string;
        code: string;
        statusLog: {
            old: string;
            new: string;
        }[];
        callbackUrl: string;
        client: {
            _id: string;
            name: string;
            apiKey: string;
            paymentsConfigs: string[];
            createdAt: string;
            updatedAt: string;
            __v: number;
        };
        currentStatus: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        transactionId: string;
    };
    config: {
        _id: string;
        name: string;
        key: string;
        publicKey: string;
        isActive: boolean;
        __v: number;
        createdAt: string;
        updatedAt: string;
    };
    apiId: string;
};
export default _default;
