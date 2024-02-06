import { ProductsRepository } from '@app/products/repositories/products.repository';
import { CreateProductDto } from '@domain/dtos/product/create-product.dto';
import { Product, ProductDocument } from '@domain/entities/product/product.schema';
import { Document, Types } from 'mongoose';
export declare class InMemoryProductsRepository implements ProductsRepository {
    products: ProductDocument[];
    create(_product: CreateProductDto): Promise<Document<unknown, any, Product> & Product & {
        _id: Types.ObjectId;
    }>;
}
