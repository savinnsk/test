import { ApiProperty } from '@nestjs/swagger';

export class PaymentsConfigsResponseDoc {
  @ApiProperty({
    example: 'pagarme',
    description: 'Payment resource name.',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'sk_test_JsxSxj000333',
    description: 'Payment resource key.',
    type: 'string',
  })
  key: string;

  @ApiProperty({
    example: 'TEST_33112211',
    description: 'Payment resource public key.',
    type: 'string',
  })
  publicKey: string;

  @ApiProperty({
    example: true,
    type: 'boolean',
  })
  isActive: boolean;

  @ApiProperty({
    example: 0,
    description: 'Payment resource version.',
    type: 'number',
  })
  __v: number;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the payment config was created.',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the payment config was updated.',
    type: Date,
  })
  updatedAt: Date;
}
