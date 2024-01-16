import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Address } from '../address/address.schema';

export type PayerDocument = HydratedDocument<Payer>;

@Schema()
export class Payer {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  customerId: string;

  @Prop()
  document: string;

  @Prop()
  documentType: 'CPF' | 'CNPJ' | 'PASSPORT';

  @Prop()
  dateOfBirth: string;

  @Prop()
  billingAddress: Address;

  @Prop()
  shippingAddress?: Address;
}

export const PayerSchema = SchemaFactory.createForClass(Payer);
