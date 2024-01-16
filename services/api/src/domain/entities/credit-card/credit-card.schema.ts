import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreditCardDocument = HydratedDocument<CreditCard>;

@Schema()
export class CreditCard {
  @Prop()
  holderName: string;

  @Prop()
  bin: string;

  @Prop()
  lastFourNumbers: string;

  @Prop()
  expirationMonth: number;

  @Prop()
  expirationYear: number;

  @Prop({ required: false })
  cardToken?: string;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
