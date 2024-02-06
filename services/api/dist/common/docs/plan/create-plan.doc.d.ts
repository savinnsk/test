import { CreateProductDoc } from '../products';
export declare class CreatePlanDoc {
    paymentGateway: string;
    name: string;
    description: string;
    interval: string;
    intervalCount: number;
    billingCycles: number;
    billingTriggerType: string;
    billingTriggerDay: number;
    invoiceSplit: boolean;
    product: CreateProductDoc;
}
