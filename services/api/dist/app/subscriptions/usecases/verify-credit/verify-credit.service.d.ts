import { ClientProxy } from '@nestjs/microservices';
import { Client } from '@domain/entities/client/client.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
export declare class VerifyCreditService {
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(data: CreateSubscriptionDto, client: Client): Promise<void>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
