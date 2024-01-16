import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AddressDto } from './address.dto';

export class PayerDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  documentType: 'CPF' | 'CNPJ' | 'PASSPORT';

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress: AddressDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress?: AddressDto;
}
