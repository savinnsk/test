import {
  Currency,
  PaymentGateway,
  PaymentMethod,
} from '@app/payments/enums/payment.enum';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { AddressDto } from './address.dto';
import { BilletDto } from './billet.dto';
import { CreditCardDto } from './credit-card.dto';
import { FlightDto } from './flight.dto';
import { ItemDto } from './item.dto';
import { PayerDto } from './payer.dto';

@ApiExtraModels(AddressDto, CreditCardDto, PayerDto, ItemDto, FlightDto)
export class AuthorizeDto {
  @ApiProperty({
    type: String,
    enum: PaymentGateway,
  })
  @IsEnum(PaymentGateway)
  paymentGateway: PaymentGateway;

  @ApiProperty()
  @IsPositive()
  amount: number;

  @ApiProperty({
    default: Currency.BRL,
    enum: Currency,
  })
  @IsEnum(Currency)
  currency: Currency = Currency.BRL;

  @ApiProperty({
    default: 1,
    minimum: 1,
    maximum: 12,
  })
  @Min(1)
  @Max(12)
  installments = 1;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PayerDto)
  payer?: PayerDto;

  @ApiPropertyOptional()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items?: ItemDto[];

  @ApiPropertyOptional()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => FlightDto)
  flights?: FlightDto[];

  @ApiProperty({
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    enum: PaymentMethod,
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  expiresIn?: number;

  @ApiProperty()
  @ValidateIf((o) => o.paymentMethod == PaymentMethod.CreditCard)
  @ValidateNested()
  @Type(() => CreditCardDto)
  creditCard?: CreditCardDto;

  @ApiProperty()
  @ValidateIf((o) => o.paymentMethod == PaymentMethod.Billet)
  @ValidateNested()
  @Type(() => BilletDto)
  billet?: BilletDto;

  @ApiProperty()
  @ValidateIf((o) => o.paymentMethod == PaymentMethod.Pix)
  @ValidateNested()
  pixQr?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsString()
  callbackUrl?: string;

  @ApiProperty()
  @IsOptional()
  metadata?: {
    sessionId?: string;
    ip?: string;
    antifraud_ref_id?: string;
  };
}
