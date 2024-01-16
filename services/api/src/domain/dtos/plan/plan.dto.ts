import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { TriggerType } from '@domain/enums/billing-trigger-type.enum';
import { IntervalType } from '@domain/enums/intervalType.enum';
import { CreateProductDto } from '../product/create-product.dto';

export class PlanDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(IntervalType)
  interval: IntervalType;

  @IsNumber()
  intervalCount: number;

  @IsNumber()
  @IsOptional()
  billingCycles: number;

  @IsEnum(TriggerType)
  billingTriggerType: TriggerType;

  @IsNumber()
  billingTriggerDay: number;

  @IsBoolean()
  invoiceSplit: boolean;

  @IsObject()
  @IsOptional()
  metadata?: any;

  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @IsString()
  @IsOptional()
  productId?: string;
}
