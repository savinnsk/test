import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Product,
  ProductSchema,
} from '@domain/entities/product/product.schema';
import { DatabaseModule } from '@infra/database/database.module';
import usecases from './usecases';
import { CreateProductService } from './usecases/create-product/create-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    DatabaseModule,
  ],
  providers: [...usecases, CreateProductService],
  exports: [...usecases, CreateProductService],
})
export class ProductsModule {}
