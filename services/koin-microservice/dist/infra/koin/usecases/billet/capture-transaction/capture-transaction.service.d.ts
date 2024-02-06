import { HttpClientPort } from '@domain/ports/http.port';
interface CaptureTransactionServiceProps {
    token: string;
    data: any;
}
export declare class CaptureTransactionService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ token, data }: CaptureTransactionServiceProps): Promise<any>;
    catch(error: any): any;
}
export {};
