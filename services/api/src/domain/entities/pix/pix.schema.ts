import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PixDocument = HydratedDocument<Pix>;

@Schema()
export class Pix {
  @Prop()
  expires_in: number;

  @Prop()
  expires_at: string;

  @Prop()
  qr_code: string;

  @Prop()
  qr_code_url: [];
}

export const PixSchema = SchemaFactory.createForClass(Pix);
