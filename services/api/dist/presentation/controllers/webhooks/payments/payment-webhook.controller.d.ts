import { HttpService } from '@nestjs/axios';
import { PaymentsService } from '@app/payments/payments.service';
export declare class PaymentWebHookController {
    private readonly paymentsService;
    private readonly httpService;
    constructor(paymentsService: PaymentsService, httpService: HttpService);
    parse(payload: any): Promise<any>;
}
