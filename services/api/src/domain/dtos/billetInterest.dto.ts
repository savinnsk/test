import { IsString } from 'class-validator';

export class BilletInterestDto {
  @IsString()
  days: number;

  @IsString()
  type: string;

  @IsString()
  amount: string;
}
