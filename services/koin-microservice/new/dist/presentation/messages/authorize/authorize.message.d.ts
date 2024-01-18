import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { AuthorizeTransactionService } from '@infra/koin/usecases/billet/authorize-transaction/authorize-transaction.service';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { CreateCardPaymentService } from '@infra/koin/usecases/card/create-payment/create-payment.service';
import { Credentials } from '@common/mappers/credential-mapper';
import { TokenizeCardPaymentService } from '@infra/koin/usecases/card/tokenize-card/tokenize-card.service';
export declare class AuthorizeMessage {
    private readonly tokenizeCardPaymentService;
    private readonly authorizeTransactionService;
    private readonly createCardPaymentService;
    private readonly authService;
    constructor(tokenizeCardPaymentService: TokenizeCardPaymentService, authorizeTransactionService: AuthorizeTransactionService, createCardPaymentService: CreateCardPaymentService, authService: AuthService);
    execute(payload: IPayload<ApiCreateAuthorizeDto & {
        transactionId: string;
        callbackUrl: string;
        metadata: {
            antifraud_ref_id: string;
            sessionId: string;
            ip: string;
        };
    }>): Promise<any>;
    cardPayment(payload: IPayload<ApiCreateAuthorizeDto & {
        transactionId: string;
        callbackUrl: string;
        metadata: {
            sessionId: string;
            ip: string;
            antifraud_ref_id: string;
        };
    }>, credentials: Credentials): Promise<any>;
}
