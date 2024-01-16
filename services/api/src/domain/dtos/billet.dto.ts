import { IsObject, IsOptional, IsString } from 'class-validator';

import { BilletFine } from '@domain/interfaces/billetFine.interface';
import { BilletInterestDto } from './billetInterest.dto';

export class BilletDto {
  @IsString()
  @IsOptional()
  barcode: string;

  @IsString()
  @IsOptional()
  instructions: string;

  @IsString()
  @IsOptional()
  due_at: string;

  @IsObject()
  @IsOptional()
  interest: BilletInterestDto;

  @IsObject()
  @IsOptional()
  fine: BilletFine;
}
