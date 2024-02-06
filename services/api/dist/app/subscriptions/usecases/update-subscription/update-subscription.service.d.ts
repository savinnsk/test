import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { ClientProxy } from '@nestjs/microservices';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
export declare class UpdateSubscriptionService {
    private readonly subscriptionsRepository;
    private readonly findSubscriptionService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(subscriptionsRepository: SubscriptionsRepository, findSubscriptionService: FindSubscriptionService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(updateSubscriptionDto: UpdateSubscriptionDto, id: string, client: Client): Promise<SubscriptionDocument>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
