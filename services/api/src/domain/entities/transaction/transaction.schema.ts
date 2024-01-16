import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';

import {
  Currency,
  PaymentGateway,
  PaymentMethod,
} from '@app/payments/enums/payment.enum';
import { Billet } from '../billet/billet.schema';
import { Client } from '../client/client.schema';
import { CreditCard } from '../credit-card/credit-card.schema';
import { Payer } from '../payer/payer.schema';
import { Pix } from '../pix/pix.schema';
import { StatusLog } from '../status-log/status-log.schema';
import { Exchange } from '../exchange/exchange.schema';
import { InstallmentOption } from '../installment-option/installment-option.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop()
  paymentGateway: PaymentGateway;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop()
  amount: number;

  @Prop()
  currency: Currency;

  @Prop()
  installments: number;

  @Prop()
  installmentOptions: InstallmentOption[];

  @Prop()
  payer: Payer;

  @Prop()
  exchange?: Exchange;

  @Prop()
  creditCard: CreditCard;

  @Prop()
  billet: Billet;

  @Prop()
  pix: Pix;

  @Prop()
  transactionId: string;

  @Prop()
  currentStatus: string;

  @Prop()
  description: string;

  @Prop()
  code: string;

  @Prop({ type: Object, default: {} })
  metadata: any;

  @Prop()
  statusLog: [StatusLog];

  @Prop()
  callbackUrl?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Client.name,
  })
  @Type(() => Client)
  client: Client;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
