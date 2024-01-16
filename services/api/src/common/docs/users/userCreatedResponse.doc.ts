import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedDoc {
  @ApiProperty({
    example: 'Joseph',
    description: 'Users name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'joseph@mail.com',
    description: 'Users email',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the user was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-18T20:58:35.053Z',
    description: 'Date when the user was updated',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    example: 0,
    description: 'Users version',
    type: 'number',
  })
  __v: number;
}
