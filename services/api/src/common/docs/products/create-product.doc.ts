import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDoc {
  @ApiProperty({
    example: 'Nome do plano',
    description: 'Here is the name of the product',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 10,
    description: 'Here is the price of the product',
    type: 'number',
  })
  price: number;
}
