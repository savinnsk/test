import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateIf, ValidateNested } from 'class-validator';

import {
  PaymentGateway,
  PaymentMethod,
} from '@app/payments/enums/payment.enum';
import { PayerDto } from '../payer.dto';
import { CreditCardDto } from '../credit-card.dto';

export class CreateSubscriptionDto {
  @IsEnum(PaymentGateway)
  paymentGateway: PaymentGateway;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  planId: string;

  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;

  @ValidateIf((o) => o.paymentMethod == PaymentMethod.CreditCard)
  @ValidateNested()
  @Type(() => CreditCardDto)
  creditCard?: CreditCardDto;
}
