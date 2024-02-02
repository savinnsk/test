import { HttpClientPort } from '@domain/ports/http.port';
interface CaptureCardPaymentServiceProps {
    id: string;
    token: string;
}
export declare class CaptureCardPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ id, token }: CaptureCardPaymentServiceProps): Promise<any>;
    catch(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
export {};
