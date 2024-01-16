import { Test, TestingModule } from '@nestjs/testing';

import { ProductsRepository } from '@app/products/repositories/products.repository';
import { productMock } from '@common/mocks/product.mock';
import { InMemoryProductsRepository } from '@infra/database/in-memory/repositories/products.repository';
import { CreateProductService } from './create-product.service';

describe('Create product service', () => {
  let createProductService: CreateProductService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: ProductsRepository,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    productsRepository = module.get<ProductsRepository>(ProductsRepository);

    createProductService =
      module.get<CreateProductService>(CreateProductService);
  });

  it('shoud be defined', () => {
    expect(createProductService).toBeDefined();
  });

  it('should be able to create a product', async () => {
    const newProduct = await createProductService.execute(productMock);

    expect(newProduct.id).toBeTruthy();
    expect(newProduct.name).toEqual('Produto de assinatura');
  });

  it('should return internal server exception when repository fails', async () => {
    jest.spyOn(productsRepository, 'create').mockRejectedValueOnce('Error');
    try {
      await createProductService.execute(productMock);
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });
});
