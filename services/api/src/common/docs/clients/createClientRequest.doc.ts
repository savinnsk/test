import { ApiProperty } from '@nestjs/swagger';

import { PaymentsConfigsDoc } from '../payments';

export class CreateClientRequestDoc {
  @ApiProperty({
    example: 'Busca milhas.',
    description: 'Client name.',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    isArray: true,
  })
  paymentsConfigs: PaymentsConfigsDoc;
}
