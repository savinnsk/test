import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentConfigDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  key?: string;
  @IsString()
  @IsOptional()
  publicKey?: string;
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  password?: string;
}
