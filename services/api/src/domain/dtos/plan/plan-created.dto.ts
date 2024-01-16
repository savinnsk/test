import {
  IsString,
  IsNumber,
  IsBoolean,
  IsObject,
  IsEnum,
} from 'class-validator';

import { PaymentGateway } from '@app/payments/enums/payment.enum';

export class PlanCreatedDto {
  @IsString()
  id: string;

  @IsEnum(PaymentGateway)
  paymentGateway: PaymentGateway;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  interval: string;

  @IsNumber()
  intervalCount: number;

  @IsString()
  intervalName: string;

  @IsString()
  billingTriggerType: string;

  @IsNumber()
  billingTriggerDay: number;

  @IsNumber()
  billingCycles: number;

  @IsBoolean()
  invoiceSplit: boolean;

  @IsObject()
  metadata: any;

  @IsString()
  productId: string;

  @IsString()
  planId: string;
}
