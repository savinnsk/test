import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPostalCode, IsString, Length } from 'class-validator';

export class AddressDto {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsInt()
  number: number;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @Length(2)
  country: string;

  @ApiProperty()
  @IsPostalCode('any')
  zipCode: string;
}
