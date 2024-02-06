import { HttpClientPort } from '@domain/ports/http.port';
interface SendNotificationPaymentServiceProps {
    id: string;
    token: string;
    data: any;
}
export declare class SendNotificationPaymentService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ id, token, data }: SendNotificationPaymentServiceProps): Promise<any>;
    catch(error: any): any;
}
export {};
