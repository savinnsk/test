import { IsNumber, IsObject, IsString } from 'class-validator';

export class ProductCreatedDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsObject()
  metadata?: any;

  @IsString()
  status?: string;

  @IsString()
  productId?: string;
}
