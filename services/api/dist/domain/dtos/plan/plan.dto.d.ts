import { TriggerType } from '@domain/enums/billing-trigger-type.enum';
import { IntervalType } from '@domain/enums/intervalType.enum';
import { CreateProductDto } from '../product/create-product.dto';
export declare class PlanDto {
    name: string;
    description: string;
    interval: IntervalType;
    intervalCount: number;
    billingCycles: number;
    billingTriggerType: TriggerType;
    billingTriggerDay: number;
    invoiceSplit: boolean;
    metadata?: any;
    product: CreateProductDto;
    productId?: string;
}
