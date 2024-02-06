import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { TriggerType } from '@domain/enums/billing-trigger-type.enum';
import { IntervalType } from '@domain/enums/intervalType.enum';
export declare const planMock: {
    paymentGateway: PaymentGateway;
    name: string;
    description: string;
    interval: IntervalType;
    intervalCount: number;
    billingTriggerType: TriggerType;
    billingTriggerDay: number;
    billingCycles: number;
    invoiceSplit: boolean;
    product: {
        name: string;
        price: number;
    };
};
