import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class ItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
