import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';

export abstract class PaymentGatewayPort {
  abstract authenticate?();
  abstract client(): Promise<any>;
  abstract authorize(authorizeDto: AuthorizeDto);
  abstract capture(captureDto: CaptureDto);
}
