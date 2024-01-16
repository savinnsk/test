import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExchangeDocument = HydratedDocument<Exchange>;

@Schema({
  timestamps: true,
})
export class Exchange {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  value: number;

  @Prop()
  quotation: number;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
