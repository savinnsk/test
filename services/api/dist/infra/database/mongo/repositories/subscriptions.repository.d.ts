/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { Subscription, SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { PaginationRequest } from '@domain/dtos/pagination';
export declare class MongoSubscriptionsRepository implements SubscriptionsRepository {
    private readonly subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(subscription: CreateSubscriptionDto): Promise<import("mongoose").Document<unknown, any, Subscription> & Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(params: PaginationRequest): Promise<{
        content: (import("mongoose").Document<unknown, any, Subscription> & Subscription & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total_items: number;
        page: number;
    }>;
    find(id: string): Promise<import("mongoose").Document<unknown, any, Subscription> & Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(data: UpdateSubscriptionDto, id: string): Promise<SubscriptionDocument>;
    partialUpdate(data: any, id: string): Promise<SubscriptionDocument | any>;
}
