import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDoc {
  @ApiProperty({
    example: 'login@mail.com',
    description: 'user email.',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'user password.',
    type: 'string',
  })
  password: string;
}
