import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { PlanDto } from './plan.dto';
export declare class CreatePlanDto extends PlanDto {
    paymentGateway: PaymentGateway;
}
