import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BilletFine } from '@domain/interfaces/billetFine.interface';
import { BilletInterest } from '@domain/interfaces/billetInterest.interface';

export type BilletDocument = HydratedDocument<Billet>;

@Schema()
export class Billet {
  @Prop()
  barcode: string;

  @Prop({ required: false })
  instructions: string;

  @Prop({ required: false })
  due_at: string;

  @Prop({ type: Object, required: false })
  interest: BilletInterest;

  @Prop({ type: Object, required: false })
  fine: BilletFine;
}

export const BilletSchema = SchemaFactory.createForClass(Billet);
