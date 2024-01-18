import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
export interface IToKoinRequest {
    data: ApiCreateAuthorizeDto & {
        _id: string;
        transactionId: string;
        callbackUrl: string;
        fraudId: string;
        payer: {
            ip: string;
        };
        installmentId: string;
    };
}
export interface IToKoinResponse {
    data: any;
}
export interface IToApiRequest {
    data: any;
    dto: ApiCreateAuthorizeDto;
}
export interface IToApiResponse {
    data: any;
}
export declare class CaptureOrderMapper {
    static toKoin({ data }: IToKoinRequest): IToKoinResponse;
    static toApi({ data, dto }: IToApiRequest): IToApiResponse;
}
