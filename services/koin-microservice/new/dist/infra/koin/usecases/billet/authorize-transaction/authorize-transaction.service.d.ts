import { CreateAuthorizeDto } from '@domain/dtos/authorize-charge/create-authorize.dto';
import { HttpClientPort } from '@domain/ports/http.port';
interface AuthorizeTransactionServiceProps {
    data: CreateAuthorizeDto;
    token: string;
}
export declare class AuthorizeTransactionService {
    private readonly httpClient;
    constructor(httpClient: HttpClientPort);
    execute({ data, token }: AuthorizeTransactionServiceProps): Promise<import("../../../../../domain/interfaces/axios-http-client.interface").HttpResponse<any> | {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    }>;
    catch(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
export {};
