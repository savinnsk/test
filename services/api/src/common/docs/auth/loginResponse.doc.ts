import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDoc {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckBpbjguY29tLmJyIiwic3ViIjoiNjNjYWE3NzA2NzgxMzdmZDcwZWM5MDU1IiwiaWF0IjoxNjc0NDc0OTgxLCJleHAiOjE2NzQ1NjEzODF9.8dAqxMSX-zT2uGrsoj7suWj-JwkUMJgHO9T90nM29Nc',
    description: 'access token',
    type: 'string',
  })
  accessToken: string;
}
