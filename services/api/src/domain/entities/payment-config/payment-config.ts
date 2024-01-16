import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentConfigDocument = HydratedDocument<PaymentConfig>;

@Schema({
  timestamps: true,
})
export class PaymentConfig {
  @Prop({ required: true })
  name: string;

  @Prop()
  key: string;

  @Prop()
  publicKey: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const PaymentConfigSchema = SchemaFactory.createForClass(PaymentConfig);
