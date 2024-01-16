import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';

export interface PaymentGatewayIntegration {
  authenticate?();
  client(): Promise<any>;
  authorize(authorizeDto: AuthorizeDto);
  capture(captureDto: CaptureDto);
}
