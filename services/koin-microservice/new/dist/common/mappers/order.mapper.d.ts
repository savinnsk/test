import { CreateAuthorizeDto as ApiCreateAuthorizeDto, CreditCardModel } from 'payment-hub-types';
import { CreateAuthorizeDto } from '@domain/dtos/authorize-charge/create-authorize.dto';
import { CaptureKoinResponse, CreatePaymentDto, CreditCardToKoinPayload } from '@domain/dtos/create-payment/create-payment-dto';
import { Credentials } from './credential-mapper';
export interface IToKoinRequest {
    data: ApiCreateAuthorizeDto & {
        transactionId: string;
    };
}
export interface IToKoinResponse {
    data: CreateAuthorizeDto;
}
export interface IToApiRequest {
    data: any;
    dto: ApiCreateAuthorizeDto;
}
export interface IToApiResponse {
    data: any;
}
export interface ICardKoinRequest {
    data: ApiCreateAuthorizeDto & {
        transactionId: string;
    } & {
        callbackUrl: string;
    } & {
        koinCreditCardToken: string;
    } & {
        metadata: {
            sessionId: string;
            ip: string;
            antifraud_ref_id: string;
        };
    };
    credentials: Credentials;
}
export interface ICardKoinResponse {
    data: CreatePaymentDto;
}
export declare class OrderMapper {
    static billetToKoin({ data }: IToKoinRequest): IToKoinResponse;
    static cardToKoin({ data, credentials, }: ICardKoinRequest): ICardKoinResponse;
    static tokenizeCard(dataCard: CreditCardModel, referenceId: string): CreditCardToKoinPayload;
    static captureCardToKoinToApi(data: CaptureKoinResponse): IToApiResponse;
    static toApi({ data, dto }: IToApiRequest): IToApiResponse;
}
