import { ApiProperty } from '@nestjs/swagger';

export class PaymentsConfigsDoc {
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
    required: false,
  })
  publicKey: string;
}
