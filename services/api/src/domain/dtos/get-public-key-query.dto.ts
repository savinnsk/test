import { IsEnum } from 'class-validator';

import { PaymentGateway } from '@app/payments/enums/payment.enum';

export class PublicKeyQueryDto {
  @IsEnum(PaymentGateway)
  payment_gateway: PaymentGateway;
}
