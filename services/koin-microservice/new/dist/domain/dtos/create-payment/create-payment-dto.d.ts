export interface CreditCardToKoinPayload {
    transaction: {
        reference_id: string;
    };
    card: {
        number: string;
        expiration_month: string;
        expiration_year: string;
        security_code: string;
        holder_name: string;
    };
}
interface Item {
    price: {
        currency_code: string;
        value: number;
    };
    category: {
        id: string;
        name: string;
    };
    type: string;
    id: string;
    name: string;
    quantity: number;
}
export interface CreatePaymentDto {
    store: {
        code: string;
    };
    transaction: {
        amount: {
            currency_code: string;
            value: number;
        };
        reference_id: string;
        business_id?: string;
        account: string;
    };
    payment_method: {
        code: string;
        secure_token: string;
        installments: number;
    };
    payer: {
        full_name: string;
        email: string;
        document: {
            type: string;
            number: string;
        };
    };
    buyer: {
        document: {
            number: string;
            nationality: string;
            type: string;
        };
        phone: {
            area_code: string;
            number: string;
            type: string;
        };
        id: string;
        first_name: string;
        last_name: string;
        full_name: string;
        email: string;
        birth_date: string;
    };
    session_id: string;
    ip_address: string;
    antifraud_ref_id?: string;
    country_code: string;
    notification_url: string[];
    items: Item[];
}
export interface CaptureKoinResponse {
    status: {
        type: string;
        date: string;
    };
    store: {
        code: string;
        category: string;
    };
    transaction: {
        reference_id: string;
        business_id: string;
        account: string;
        amount: {
            currency_code: string;
            value: number;
        };
    };
    country_code: 'BR';
    order_id: 'fdc8e42f-dfb1-49c8-9224-dbd953221f7a';
}
export {};
