import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { PaginationRequest } from '@domain/dtos/pagination';
export declare class GetAllSubscriptionsService {
    private readonly subscriptionsRepository;
    constructor(subscriptionsRepository: SubscriptionsRepository);
    execute(params: PaginationRequest): Promise<import("@domain/dtos/pagination").PaginationResponse>;
}
