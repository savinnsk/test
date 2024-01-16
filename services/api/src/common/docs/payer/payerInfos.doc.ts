import { ApiProperty } from '@nestjs/swagger';

import { BillingAddressInfosDoc } from '../address';
import { IsOptional } from 'class-validator';

export class PayerInfosDoc {
  @ApiProperty({
    example: 'Cláudio',
    description: 'Payer name',
    type: 'string',
  })
  firstName: string;

  @ApiProperty({
    example: 'Lorenzo Lopes',
    description: 'Payer last name',
    type: 'string',
  })
  lastName: string;

  @ApiProperty({
    example: 'claudio.lorenzo.lopes@nine9.com.br',
    description: 'Payer email',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '(79) 99628-2825',
    description: 'Payer phone',
    type: 'string',
    required: false,
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: '05394152004',
    description: 'Payer document',
    type: 'string',
  })
  document: string;

  @ApiProperty({
    example: 'CPF',
    description: 'Payer document type',
    type: 'string',
  })
  documentType: string;

  @ApiProperty({
    example: '09/01/1991',
    description: 'Payer birth date',
    type: 'date',
  })
  dateOfBirth: Date;

  @ApiProperty({
    example: BillingAddressInfosDoc,
    description: 'Payer billing address',
    type: BillingAddressInfosDoc,
  })
  billingAddress: BillingAddressInfosDoc;
}
