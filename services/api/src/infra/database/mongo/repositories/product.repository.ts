import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsRepository } from '@app/products/repositories/products.repository';
import {
  Product,
  ProductDocument,
} from '@domain/entities/product/product.schema';
import { CreateProductDto } from '@domain/dtos/product/create-product.dto';

@Injectable()
export class MongoProductsRepository implements ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async create(product: CreateProductDto) {
    try {
      const productCreated = await this.productModel.create(product);

      return productCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
