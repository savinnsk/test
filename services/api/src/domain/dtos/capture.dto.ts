import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CaptureDto {
  @ApiProperty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsOptional()
  metadata?: {
    sessionId?: string;
    ip?: string;
    antifraud_ref_id?: string;
  };
}
