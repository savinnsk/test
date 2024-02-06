import { Client } from '@domain/entities/client/client.schema';
import { ClientProxy } from '@nestjs/microservices';
export declare class GetPublicKeysService {
    private readonly pagseguroClient;
    constructor(pagseguroClient: ClientProxy);
    execute(query: any, client: Client): Promise<any>;
    private send;
    private getPaymentGatewayClient;
    private getGatewayKey;
}
