import { ApiProperty } from '@nestjs/swagger';

export class CreditCardInfosDoc {
  @ApiProperty({
    example: 'Alexandre Vinicius Nogueira',
    description: 'Credit card holder name',
    type: 'string',
  })
  holderName: string;

  @ApiProperty({
    example: '4235647728025682',
    description: 'Credit card number',
    type: 'string',
  })
  number: string;

  @ApiProperty({
    example: 10,
    description: 'Credit card expiration month',
    type: 'number',
  })
  expirationMonth: number;

  @ApiProperty({
    example: 2023,
    description: 'Credit card expiration year',
    type: 'number',
  })
  expirationYear: number;

  @ApiProperty({
    example: '123',
    description: 'Credit card cvv',
    type: 'string',
  })
  cvv: string;

  @ApiProperty({
    example:
      'UKQmKwJXq8E6svZ3cw5aPEZQPGJ0waxbX68gFFL3xhhTwuOqC3/Mj0oI+Q0KpN7N0gDenymD85WoW7SWO3+JrZIbGMCuFQum9VhbYduesGHaCm9KbGh9HdCSM3PbTSLjhSruvz4ijt0sSjARp38rfNtluQzCIx1P+X7L50zQ1jzUe983tu6VG9uDFe/2CnNoEaXV4MFjW+I78DXsrFmXM5k9/JYy2d492XLYWq/N0r71ZhSCBFinP25XycZdEtGZcfRxJhAdbNIvPtpqLln5O3811cYcvkBg0kF94y+u9iU2PpA61kmpcM4gvpM84Kiz94uPEDz22+E2gu2fsnVZ9Q==',
    description: 'Credit card encrypted token',
    type: 'string',
    required: false,
  })
  cardToken: string;
}
