import { HttpClientPort } from '@domain/ports/http.port';
interface RefundCardPaymentServiceProps {
    id: string;
    token: string;
}
export declare class RefundCardPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ id, token }: RefundCardPaymentServiceProps): Promise<any>;
    catch(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
export {};
