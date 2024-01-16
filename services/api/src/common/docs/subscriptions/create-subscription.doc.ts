import { ApiProperty } from '@nestjs/swagger';

import { PayerInfosDoc } from '../payer';
import { CreditCardInfosDoc } from '../payments';

export class CreateSubscriptionDoc {
  @ApiProperty({
    example: 'vindi',
    description: 'Gateway used to create a subscription.',
    type: 'string',
  })
  paymentGateway: string;

  @ApiProperty({
    example: 'credit_card',
    description: 'Payment method for subscription.',
    type: 'string',
  })
  paymentMethod: string;

  @ApiProperty({
    example: '1233456',
    description: 'Plans id for subscription',
    type: 'string',
  })
  planId: string;

  @ApiProperty({
    example: PayerInfosDoc,
    description: 'Payer whos subscribe',
    type: PayerInfosDoc,
  })
  payer: PayerInfosDoc;

  @ApiProperty({
    example: CreditCardInfosDoc,
    description: 'Credit card informations',
    type: CreditCardInfosDoc,
  })
  creditCard: CreditCardInfosDoc;
}
