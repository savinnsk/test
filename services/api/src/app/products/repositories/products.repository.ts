import { CreateProductDto } from '@domain/dtos/product/create-product.dto';
import { ProductDocument } from '@domain/entities/product/product.schema';

export abstract class ProductsRepository {
  abstract create(product: CreateProductDto): Promise<ProductDocument>;
}
