import { ClientProxy } from '@nestjs/microservices';
import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { Client } from '@domain/entities/client/client.schema';
import { PlansRepository } from '@app/plans/repositories/plans.repository';
export declare class CreateSubscriptionService {
    private readonly subscriptionsRepository;
    private readonly plansRepository;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(subscriptionsRepository: SubscriptionsRepository, plansRepository: PlansRepository, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(subscription: CreateSubscriptionDto, client: Client): Promise<SubscriptionDocument | any>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
