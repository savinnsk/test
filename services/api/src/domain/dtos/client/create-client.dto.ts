import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsArray()
  @IsOptional()
  paymentsConfigs?: {
    name: string;
    key?: string;
    publicKey?: string;
    username?: string;
    password?: string;
  }[];
}
