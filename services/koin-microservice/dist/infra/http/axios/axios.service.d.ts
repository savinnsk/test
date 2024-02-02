import { HttpRequest, HttpResponse } from '@domain/interfaces/axios-http-client.interface';
import { HttpClientPort } from '@domain/ports/http.port';
import { ConfigService } from '@nestjs/config';
export declare class AxiosAdapter implements HttpClientPort {
    private readonly configService;
    constructor(configService: ConfigService);
    request(data: HttpRequest, token?: string): Promise<HttpResponse>;
    requestPayment(data: HttpRequest, token?: string): Promise<HttpResponse>;
}
