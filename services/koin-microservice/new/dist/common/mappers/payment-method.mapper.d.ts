export interface IToPagarmeRequest {
    data: string;
}
export interface IToPagarmeResponse {
    data: string;
}
export interface IToApiRequest {
    data: string;
}
export interface IToApiResponse {
    data: string;
}
export declare class PaymentMethodMapper {
    static toPagarme({ data }: IToPagarmeRequest): IToPagarmeResponse;
    static toApi({ data }: IToApiRequest): IToApiResponse;
}
