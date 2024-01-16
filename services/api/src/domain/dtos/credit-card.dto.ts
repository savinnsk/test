import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsEmpty,
  IsNumberString,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreditCardDto {
  @ApiProperty()
  @IsString()
  holderName: string;

  @ApiProperty()
  // @IsCreditCard()
  number: string;

  @ApiProperty()
  @Min(1)
  @Max(12)
  expirationMonth: number;

  @ApiProperty()
  @Min(2023)
  expirationYear: number;

  @ApiProperty()
  @IsNumberString()
  cvv: string;

  @ApiProperty()
  cardToken: string;
}
