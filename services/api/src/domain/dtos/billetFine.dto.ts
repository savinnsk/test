import { IsString } from 'class-validator';

export class BilletFineDto {
  @IsString()
  days: number;

  @IsString()
  type: string;

  @IsString()
  amount: string;
}
