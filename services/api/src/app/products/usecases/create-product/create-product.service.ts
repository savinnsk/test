import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { ProductsRepository } from '@app/products/repositories/products.repository';
import { CreateProductDto } from '@domain/dtos/product/create-product.dto';
import { ProductDocument } from '@domain/entities/product/product.schema';

@Injectable()
export class CreateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: CreateProductDto): Promise<ProductDocument> {
    try {
      const productCreated = await this.productsRepository.create(product);

      if (!productCreated) {
        throw new BadRequestException('Product cant be created.');
      }

      return productCreated;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
