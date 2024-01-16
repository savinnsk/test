import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatusLogDocument = HydratedDocument<StatusLog>;

@Schema({
  timestamps: true,
})
export class StatusLog {
  @Prop()
  old: string;

  @Prop()
  new: string;
}

export const StatusLogSchema = SchemaFactory.createForClass(StatusLog);
