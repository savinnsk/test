import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Client } from '../client/client.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop()
  paymentGateway: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  interval: string;

  @Prop()
  intervalCount: string;

  @Prop()
  billingCycles: string;

  @Prop()
  billingTriggerType: string;

  @Prop()
  billingTriggerDay: string;

  @Prop()
  invoiceSplit: string;

  @Prop()
  price: number;

  @Prop()
  productId: string;

  @Prop({ type: Object, default: {} })
  metadata?: any;

  @Prop()
  planId?: string;

  @Prop()
  client: Client;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
