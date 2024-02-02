declare const _default: {
    AdditionalInfo: {
        Key: string;
        Value: string;
    };
    AdditionalParameters: {
        CallbackUrl: string;
        OrderOriginData: {
            OrderOriginCompanyName: string;
            OrderOriginDocuments: {
                Key: string;
                Value: string;
            };
            OrderOriginIsDifferent: string;
        };
        SalesChannelId: string;
    };
    Buyer: {
        AdditionalInfo: {
            Key: string;
            Value: string;
        }[];
        Address: {
            AddressType: string;
            City: string;
            Country: string;
            Number: string;
            State: string;
            Street: string;
            ZipCode: string;
        };
        Documents: {
            Key: string;
            Value: string;
        }[];
        Email: string;
        Ip: string;
        Name: string;
        Phones: {
            AreaCode: string;
            Number: string;
            PhoneType: string;
        }[];
    };
    Currency: string;
    FraudId: string;
    Items: {
        Category: string;
        Description: string;
        Price: number;
        Quantity: string;
        Reference: string;
    }[];
    OrderOriginCompanyName: string;
    OrderOriginData: {
        Key: string;
        Value: string;
    };
    PaymentType: string;
    Price: number;
    Reference: string;
    Shipping: {
        Address: {
            AddressType: string;
            City: string;
            Country: string;
            Number: string;
            State: string;
            Street: string;
            ZipCode: string;
        };
        DeliveryDate: string;
        Price: string;
    };
};
export default _default;
