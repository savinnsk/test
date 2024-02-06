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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Response } from 'express';
import { Client } from '@domain/entities/client/client.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { CreateSubscriptionService } from '@app/subscriptions/usecases/create-subscription/create-subscription.service';
import { GetAllSubscriptionsService } from '@app/subscriptions/usecases/get-all-subscriptions/get-all-subscriptions.service';
import { FindSubscriptionService } from '@app/subscriptions/usecases/find-subscription/find-subscription.service';
import { UpdateSubscriptionService } from '@app/subscriptions/usecases/update-subscription/update-subscription.service';
import { CancelSubscriptionService } from '@app/subscriptions/usecases/cancel-subscription/cancel-subscription.service';
import { ReactivateSubscriptionService } from '@app/subscriptions/usecases/reactivate-subscription/reactivate-subscription.service';
import { RenewSubscriptionService } from '@app/subscriptions/usecases/renew-subscription/renew-subscription.service';
import { VerifyCreditService } from '@app/subscriptions/usecases/verify-credit/verify-credit.service';
export declare class SubscriptionsController {
    private readonly createSubscriptionService;
    private readonly getAllSubscriptionsService;
    private readonly findSubscriptionService;
    private readonly updateSubscriptionService;
    private readonly cancelSubscriptionService;
    private readonly reactivateSubscriptionService;
    private readonly renewSubscriptionService;
    private readonly verifyCreditService;
    constructor(createSubscriptionService: CreateSubscriptionService, getAllSubscriptionsService: GetAllSubscriptionsService, findSubscriptionService: FindSubscriptionService, updateSubscriptionService: UpdateSubscriptionService, cancelSubscriptionService: CancelSubscriptionService, reactivateSubscriptionService: ReactivateSubscriptionService, renewSubscriptionService: RenewSubscriptionService, verifyCreditService: VerifyCreditService);
    create(subscription: CreateSubscriptionDto, user: Client): Promise<any>;
    verifyCredit(subscription: CreateSubscriptionDto, user: Client): Promise<void>;
    reactivate(id: string, user: Client): Promise<void>;
    renew(id: string, user: Client): Promise<void>;
    getAll(response: Response, user: Client, page: number, limit: number, payerName: string): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/subscription/subscription.schema").Subscription> & import("../../../domain/entities/subscription/subscription.schema").Subscription & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, data: UpdateSubscriptionDto, user: Client): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/subscription/subscription.schema").Subscription> & import("../../../domain/entities/subscription/subscription.schema").Subscription & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string, user: Client): Promise<any>;
}
