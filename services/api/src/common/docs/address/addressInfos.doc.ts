import { ApiProperty } from '@nestjs/swagger';

export class BillingAddressInfosDoc {
  @ApiProperty({
    example: 'Rua K',
    description: 'Payer street.',
    type: 'string',
  })
  street: string;

  @ApiProperty({
    example: 662,
    description: 'Payer house number.',
    type: 'number',
  })
  number: number;

  @ApiProperty({
    example: 'Zona de Expansão (Mosqueiro)',
    description: 'Payer neighborhood.',
    type: 'string',
  })
  neighborhood: string;

  @ApiProperty({
    example: 'Aracaju',
    description: 'Payer city.',
    type: 'string',
  })
  city: string;

  @ApiProperty({
    example: 'SE',
    description: 'Payer state.',
    type: 'string',
  })
  state: string;

  @ApiProperty({
    example: 'BR',
    description: 'Payer country.',
    type: 'string',
  })
  country: string;

  @ApiProperty({
    example: '49008-417',
    description: 'Payer zip code.',
    type: 'string',
  })
  zipCode: string;
}
