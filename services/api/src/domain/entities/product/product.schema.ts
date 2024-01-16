import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: Object, default: {} })
  metadata?: any;

  @Prop({ default: 'active' })
  status?: string;

  @Prop()
  productId?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
