import { HttpClientPort } from '@domain/ports/http.port';
interface AuthServiceProps {
    url: string;
    consumerKey: string;
    secretKey: string;
}
export declare class AuthService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute(body: AuthServiceProps): Promise<any>;
    catch(error: any): any;
}
export {};
