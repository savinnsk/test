import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
export declare abstract class SubscriptionsRepository {
    abstract create(plan: CreateSubscriptionDto): Promise<SubscriptionDocument>;
    abstract getAll(params?: PaginationRequest): Promise<PaginationResponse>;
    abstract find(id: string): Promise<SubscriptionDocument>;
    abstract update(data: UpdateSubscriptionDto, id: string): Promise<SubscriptionDocument>;
    abstract partialUpdate(data: any, id: string): Promise<SubscriptionDocument | any>;
}
