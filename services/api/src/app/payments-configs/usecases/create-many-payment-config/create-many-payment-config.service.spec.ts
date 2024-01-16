import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { createPaymentsConfigsMock } from '@common/mocks/payments-config.mock';
import { InMemoryPaymentsConfigsRepository } from '@infra/database/in-memory/repositories/payments-configs.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateManyPaymentConfigService } from './create-many-payment-config.service';

describe('CreateManyPaymentConfigService', () => {
  let createManyPaymentConfigService: CreateManyPaymentConfigService;
  let paymentsConfigsRepository: PaymentsConfigsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateManyPaymentConfigService,
        {
          provide: PaymentsConfigsRepository,
          useClass: InMemoryPaymentsConfigsRepository,
        },
      ],
    }).compile();

    paymentsConfigsRepository = module.get<PaymentsConfigsRepository>(
      PaymentsConfigsRepository,
    );
    createManyPaymentConfigService = module.get<CreateManyPaymentConfigService>(
      CreateManyPaymentConfigService,
    );
  });

  it('should be defined', () => {
    expect(createManyPaymentConfigService).toBeDefined();
  });

  it('should be able to create many payment configs', async () => {
    const result = await createManyPaymentConfigService.execute({
      createPaymentsConfigsDto: [createPaymentsConfigsMock],
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(createPaymentsConfigsMock.name);
    expect(result[0].key).toEqual(createPaymentsConfigsMock.key);
    expect(result[0].id).toBeTruthy();
    expect((result[0] as any).createdAt).toBeTruthy();
    expect((result[0] as any).updatedAt).toBeTruthy();
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(paymentsConfigsRepository, 'createMany')
      .mockRejectedValueOnce('Error');
    try {
      await createManyPaymentConfigService.execute({
        createPaymentsConfigsDto: [createPaymentsConfigsMock],
      });
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
