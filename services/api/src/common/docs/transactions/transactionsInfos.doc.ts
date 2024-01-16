import { ApiProperty } from '@nestjs/swagger';

import { PayerInfosDoc } from '../payer';
import { CreditCardInfosDoc, StatusLogsInfosDoc } from '../payments';

export class TransactionsInfosDoc {
  @ApiProperty({
    example: 'Pagarme',
    description: 'Payment gateway used for transaction',
    type: 'string',
  })
  paymentGateway: string;

  @ApiProperty({
    example: 'credit_card',
    description: 'Transaction payment method',
    type: 'string',
  })
  paymentMethod: string;

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
    example: PayerInfosDoc,
    description: 'Transactions payer',
    type: PayerInfosDoc,
  })
  payer: PayerInfosDoc;

  @ApiProperty({
    example: CreditCardInfosDoc,
    description: 'Credit card used in transaction',
    type: CreditCardInfosDoc,
  })
  creditCard: CreditCardInfosDoc;

  @ApiProperty({
    example: 'Air ticket purchase',
    description: 'Description of the transaction',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    example: StatusLogsInfosDoc,
    description: 'Historical logs of the transaction',
    type: StatusLogsInfosDoc,
  })
  statusLog: StatusLogsInfosDoc;

  @ApiProperty({
    example: 'http://api:3000/v1/payments/callback',
    description: 'Callback url',
    type: 'string',
    required: false,
  })
  callbackUrl: string;

  @ApiProperty({
    example: '63caa78d678137fd70ec905a',
    description: 'Clients id',
    type: 'string',
  })
  client: string;

  @ApiProperty({
    example: 'authorized',
    description: 'The status of the transaction',
    type: 'string',
  })
  currentStatus: string;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the transaction was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the transaction was updated',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    example: 0,
    description: 'Transactions version',
    type: 'number',
  })
  __v: number;
}
