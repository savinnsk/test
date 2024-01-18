import { CreatePaymentDto } from '@domain/dtos/create-payment/create-payment-dto';
import { HttpClientPort } from '@domain/ports/http.port';
interface CreateCardPaymentServiceProps {
    data: CreatePaymentDto;
    token: string;
}
export declare class CreateCardPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ data, token }: CreateCardPaymentServiceProps): Promise<import("../../../../../domain/interfaces/axios-http-client.interface").HttpResponse<any> | {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    }>;
    catch(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
export {};
