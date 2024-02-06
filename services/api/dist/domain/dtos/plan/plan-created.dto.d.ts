import { PaymentGateway } from '@app/payments/enums/payment.enum';
export declare class PlanCreatedDto {
    id: string;
    paymentGateway: PaymentGateway;
    name: string;
    description: string;
    interval: string;
    intervalCount: number;
    intervalName: string;
    billingTriggerType: string;
    billingTriggerDay: number;
    billingCycles: number;
    invoiceSplit: boolean;
    metadata: any;
    productId: string;
    planId: string;
}
