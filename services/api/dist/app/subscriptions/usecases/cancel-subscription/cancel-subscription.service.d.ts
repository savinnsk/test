import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { ClientProxy } from '@nestjs/microservices';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
import { PlansRepository } from '@app/plans/repositories/plans.repository';
interface CancelSubscriptionServiceProps {
    id: string;
    client: Client;
}
export declare class CancelSubscriptionService {
    private readonly subscriptionsRepository;
    private readonly plansRepository;
    private readonly findSubscriptionService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(subscriptionsRepository: SubscriptionsRepository, plansRepository: PlansRepository, findSubscriptionService: FindSubscriptionService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute({ id, client }: CancelSubscriptionServiceProps): Promise<any>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
export {};
