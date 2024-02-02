import { HttpClientPort } from '@domain/ports/http.port';
interface GetPaymentServiceProps {
    id: string;
}
export declare class GetPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ id }: GetPaymentServiceProps): Promise<any>;
    catch(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
export {};
