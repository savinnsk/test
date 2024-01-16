import { ApiProperty } from '@nestjs/swagger';

import { PayerInfosDoc } from '../payer';

export class PaymentMakeRequestDoc {
  @ApiProperty({
    example: 'Pagarme',
    description: 'Payment gateway used for transaction',
    type: 'string',
  })
  paymentGateway: string;

  @ApiProperty({
    example: 300,
    description: 'Amount of the transaction',
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    example: 'BRL',
    description: 'Currency used to pay transaction',
    type: 'string',
  })
  currency: string;

  @ApiProperty({
    example: 2,
    description: 'Number of installments',
    type: 'number',
  })
  installments: number;

  @ApiProperty({
    example: 'Air ticket purchase',
    description: 'Description of the transaction',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    example: '0001',
    description: 'Code of the transaction',
    type: 'string',
  })
  code: string;

  @ApiProperty({
    example: 'http://api:3000/v1/payments/callback',
    description: 'Callback url',
    type: 'string',
  })
  callbackUrl: string;

  @ApiProperty({
    example: PayerInfosDoc,
    description: 'Transactions payer',
    type: PayerInfosDoc,
  })
  payer: PayerInfosDoc;

  @ApiProperty({
    example: 'pix',
    description: 'Transaction payment method',
    type: 'string',
  })
  paymentMethod: string;
}
