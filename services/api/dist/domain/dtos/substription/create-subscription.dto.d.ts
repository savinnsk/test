import { PaymentGateway, PaymentMethod } from '@app/payments/enums/payment.enum';
import { PayerDto } from '../payer.dto';
import { CreditCardDto } from '../credit-card.dto';
export declare class CreateSubscriptionDto {
    paymentGateway: PaymentGateway;
    paymentMethod: PaymentMethod;
    planId: string;
    payer: PayerDto;
    creditCard?: CreditCardDto;
}
