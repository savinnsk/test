import { ApiProperty } from '@nestjs/swagger';

export class StatusLogsInfosDoc {
  @ApiProperty({
    example: 'created',
    description: 'Previous log',
    type: 'string',
  })
  old: string;

  @ApiProperty({
    example: 'authorized',
    description: 'Actual log',
    type: 'string',
  })
  new: string;
}
