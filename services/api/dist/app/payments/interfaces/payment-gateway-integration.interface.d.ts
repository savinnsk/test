import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';
export interface PaymentGatewayIntegration {
    authenticate?(): any;
    client(): Promise<any>;
    authorize(authorizeDto: AuthorizeDto): any;
    capture(captureDto: CaptureDto): any;
}
