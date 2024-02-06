import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { CaptureTransactionService } from '@infra/koin/usecases/billet/capture-transaction/capture-transaction.service';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { CaptureCardPaymentService } from '@infra/koin/usecases/card/capture-payment/capture-payment.service';
import { Credentials } from '@common/mappers/credential-mapper';
import { SendNotificationPaymentService } from '@infra/koin/usecases/notication/send-nofication.service';
export declare class CaptureMessage {
    private readonly captureTransactionService;
    private readonly authService;
    private readonly captureCardPaymentCard;
    private readonly sendNotificationService;
    constructor(captureTransactionService: CaptureTransactionService, authService: AuthService, captureCardPaymentCard: CaptureCardPaymentService, sendNotificationService: SendNotificationPaymentService);
    execute(payload: IPayload<ApiCreateAuthorizeDto & {
        transactionId: string;
    }>): Promise<any>;
    captureCard(payload: IPayload<ApiCreateAuthorizeDto & {
        transactionId: string;
    }>, credentials: Credentials): Promise<any>;
}
