import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  PaymentGateway,
  PaymentMethod,
} from '@app/payments/enums/payment.enum';
import { Payer } from '../payer/payer.schema';
import { CreditCard } from '../credit-card/credit-card.schema';
import { Plan } from '../plan/plan.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
  @Prop()
  paymentGateway: PaymentGateway;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop()
  planId: string;

  @Prop()
  associatedPlan: Plan;

  @Prop()
  payer: Payer;

  @Prop()
  status: string;

  @Prop()
  subscriptionId: string;

  @Prop()
  paymentProfileId: string;

  @Prop()
  billId: string;

  @Prop()
  creditCard: CreditCard;

  @Prop()
  startAt?: Date;

  @Prop()
  endAt?: Date;

  @Prop()
  nextBillingAt?: Date;

  @Prop()
  cancelAt?: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
