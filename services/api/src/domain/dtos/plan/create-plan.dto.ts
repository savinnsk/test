import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { IsEnum } from 'class-validator';

import { PlanDto } from './plan.dto';

export class CreatePlanDto extends PlanDto {
  @IsEnum(PaymentGateway)
  paymentGateway: PaymentGateway;
}
