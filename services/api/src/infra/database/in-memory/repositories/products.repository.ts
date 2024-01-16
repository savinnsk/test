import { ProductsRepository } from '@app/products/repositories/products.repository';
import { CreateProductDto } from '@domain/dtos/product/create-product.dto';
import {
  Product,
  ProductDocument,
} from '@domain/entities/product/product.schema';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Document, Types } from 'mongoose';

@Injectable()
export class InMemoryProductsRepository implements ProductsRepository {
  products: ProductDocument[] = [];

  async create(
    _product: CreateProductDto,
  ): Promise<
    Document<unknown, any, Product> & Product & { _id: Types.ObjectId }
  > {
    const product = {
      ..._product,
      id: randomUUID(),
    } as any as ProductDocument;

    this.products.push(product);

    return product;
  }
}
