import { CreateAuthorizeDto } from 'payment-hub-types';
import { IOrderResponse, IOrderPagarmeRequest } from '@domain/interfaces/order.interface';
export interface IToPagarmeRequest {
    data: CreateAuthorizeDto;
}
export interface IToPagarmeResponse {
    data: IOrderPagarmeRequest;
}
export interface IToApiRequest {
    data: IOrderResponse;
}
export interface IToApiResponse {
    data: {
        transactionId: string;
        status: string;
    };
}
export declare class ChargeMapper {
    static toApi({ data }: IToApiRequest): IToApiResponse;
}
