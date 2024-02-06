import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { ClientProxy } from '@nestjs/microservices';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
export declare class RenewSubscriptionService {
    private readonly subscriptionsRepository;
    private readonly findSubscriptionService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(subscriptionsRepository: SubscriptionsRepository, findSubscriptionService: FindSubscriptionService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(id: string, client: Client): Promise<void>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
