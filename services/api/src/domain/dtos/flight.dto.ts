import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class FlightDto {
  @ApiProperty()
  @IsString()
  flightNumber: string;

  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsDateString()
  departure: string;

  @ApiProperty()
  @IsDateString()
  arrival: string;
}
