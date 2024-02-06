import { ConfigService } from '@nestjs/config';
import { HttpRequest, HttpResponse } from '@domain/interfaces/axios-http-client.interface';
import { HttpClientPort } from '@domain/ports/http.port';
export declare class AxiosAdapter implements HttpClientPort {
    private readonly configService;
    constructor(configService: ConfigService);
    request(data: HttpRequest): Promise<HttpResponse>;
}
