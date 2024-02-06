import { HttpClientPort } from '@domain/ports/http.port';
interface TokenizeCardPaymentServiceProps {
    data: any;
    token: string;
}
export declare class TokenizeCardPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ data, token }: TokenizeCardPaymentServiceProps): Promise<import("../../../../../domain/interfaces/axios-http-client.interface").HttpResponse<any>>;
    catch(error: any): any;
}
export {};
