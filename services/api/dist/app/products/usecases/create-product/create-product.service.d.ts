import { ProductsRepository } from '@app/products/repositories/products.repository';
import { CreateProductDto } from '@domain/dtos/product/create-product.dto';
import { ProductDocument } from '@domain/entities/product/product.schema';
export declare class CreateProductService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    execute(product: CreateProductDto): Promise<ProductDocument>;
}
