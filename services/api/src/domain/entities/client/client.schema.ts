import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

import { PaymentConfig } from '../payment-config/payment-config';

export type ClientDocument = HydratedDocument<Client>;

@Schema({
  timestamps: true,
})
export class Client {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop()
  apiKey: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentConfig' }],
  })
  paymentsConfigs: PaymentConfig[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
