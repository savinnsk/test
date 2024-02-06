import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { RefundCardPaymentService } from '@infra/koin/usecases/card/refund-payment/refund-payment.service';
import { SendNotificationPaymentService } from '@infra/koin/usecases/notication/send-nofication.service';
export declare class RefundMessage {
    private readonly refundCardPaymentService;
    private readonly sendNotificationService;
    constructor(refundCardPaymentService: RefundCardPaymentService, sendNotificationService: SendNotificationPaymentService);
    execute(payload: IPayload<ApiCreateAuthorizeDto & {
        transactionId: string;
    }>): Promise<any>;
}
