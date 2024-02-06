import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';
export declare abstract class PaymentGatewayPort {
    abstract authenticate?(): any;
    abstract client(): Promise<any>;
    abstract authorize(authorizeDto: AuthorizeDto): any;
    abstract capture(captureDto: CaptureDto): any;
}
