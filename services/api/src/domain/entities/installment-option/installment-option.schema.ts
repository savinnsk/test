import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InstallmentOptionDocument = HydratedDocument<InstallmentOption>;

@Schema()
export class InstallmentOption {
  @Prop()
  incomingPercentValue: number;

  @Prop()
  fee: number;

  @Prop()
  description: string;

  @Prop()
  originalValue: string;

  @Prop()
  valueResidueFeeTotal: string;

  orderValue: string;

  @Prop()
  maxValueFee: string;

  @Prop()
  paymentType: string;

  @Prop()
  installments: number;

  @Prop()
  valueFeeTotal: string;

  @Prop()
  firstDueDate: string;

  @Prop()
  hasIncoming: boolean;

  @Prop()
  installmentValue: string;

  @Prop()
  incomingValue: string;
}

export const InstallmentOptionSchema =
  SchemaFactory.createForClass(InstallmentOption);
