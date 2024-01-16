import { ApiProperty } from '@nestjs/swagger';

export class MeResponseDoc {
  @ApiProperty({
    example: '63caa770678137fd70ec9055',
    description: 'user id',
    type: 'string',
  })
  userId: string;

  @ApiProperty({
    example: 'login@mail.com',
    description: 'user email',
    type: 'string',
  })
  email: string;
}
