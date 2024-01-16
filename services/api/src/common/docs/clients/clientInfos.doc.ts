import { ApiProperty } from '@nestjs/swagger';

import { PaymentsConfigsResponseDoc } from '../payments';

export class ClientInfoDoc {
  @ApiProperty({
    example: 'Busca milhas.',
    description: 'Client name.',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'pph_e4788ec1-5293-4e71-ae3b-933ce7dfd93c',
    description: 'Client api key.',
    type: 'string',
  })
  apiKey: string;

  @ApiProperty({
    isArray: true,
  })
  paymentsConfigs: PaymentsConfigsResponseDoc;

  @ApiProperty({
    example: 0,
    description: 'Client version.',
    type: 'number',
  })
  __v: number;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the client was created.',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the client was updated.',
    type: Date,
  })
  updatedAt: Date;
}
