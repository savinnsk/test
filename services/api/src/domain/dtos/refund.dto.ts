import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefundDto {
  @ApiProperty()
  @IsString()
  transactionId: string;
}
