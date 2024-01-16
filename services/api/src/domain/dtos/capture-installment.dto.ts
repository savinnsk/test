import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CaptureInstallmentDto {
  @ApiProperty()
  @IsString()
  installmentOptionId: string;
}
