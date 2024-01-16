import { IsString } from 'class-validator';

export class PixDto {
  @IsString()
  expires_in: number;

  @IsString()
  expires_at: string;

  @IsString()
  qr_code: string;

  @IsString()
  qr_code_url: string;
}
