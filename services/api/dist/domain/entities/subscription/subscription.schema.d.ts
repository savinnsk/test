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
import { HydratedDocument } from 'mongoose';
import { PaymentGateway, PaymentMethod } from '@app/payments/enums/payment.enum';
import { Payer } from '../payer/payer.schema';
import { CreditCard } from '../credit-card/credit-card.schema';
import { Plan } from '../plan/plan.schema';
export type SubscriptionDocument = HydratedDocument<Subscription>;
export declare class Subscription {
    paymentGateway: PaymentGateway;
    paymentMethod: PaymentMethod;
    planId: string;
    associatedPlan: Plan;
    payer: Payer;
    status: string;
    subscriptionId: string;
    paymentProfileId: string;
    billId: string;
    creditCard: CreditCard;
    startAt?: Date;
    endAt?: Date;
    nextBillingAt?: Date;
    cancelAt?: Date;
}
export declare const SubscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription>;
