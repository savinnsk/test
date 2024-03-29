import { HttpClientPort } from '@domain/ports/http.port';
interface RefundPaymentServiceProps {
    id: string;
}
export declare class RefundPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ id }: RefundPaymentServiceProps): Promise<any>;
    catch(error: any): any;
}
export {};
