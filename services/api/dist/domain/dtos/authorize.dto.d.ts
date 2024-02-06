import { Currency, PaymentGateway, PaymentMethod } from '@app/payments/enums/payment.enum';
import { BilletDto } from './billet.dto';
import { CreditCardDto } from './credit-card.dto';
import { FlightDto } from './flight.dto';
import { ItemDto } from './item.dto';
import { PayerDto } from './payer.dto';
export declare class AuthorizeDto {
    paymentGateway: PaymentGateway;
    amount: number;
    currency: Currency;
    installments: number;
    payer?: PayerDto;
    items?: ItemDto[];
    flights?: FlightDto[];
    paymentMethod: PaymentMethod;
    expiresIn?: number;
    creditCard?: CreditCardDto;
    billet?: BilletDto;
    pixQr?: string;
    description?: string;
    code?: string;
    callbackUrl?: string;
    metadata?: {
        sessionId?: string;
        ip?: string;
        antifraud_ref_id?: string;
    };
}
