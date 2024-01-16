import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { createPaymentsConfigsMock } from '@common/mocks/payments-config.mock';
import { InMemoryPaymentsConfigsRepository } from '@infra/database/in-memory/repositories/payments-configs.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentConfigService } from './create-payment-config.service';

describe('CreatePaymentConfigService', () => {
  let createPaymentConfigService: CreatePaymentConfigService;
  let paymentsConfigsRepository: PaymentsConfigsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePaymentConfigService,
        {
          provide: PaymentsConfigsRepository,
          useClass: InMemoryPaymentsConfigsRepository,
        },
      ],
    }).compile();

    paymentsConfigsRepository = module.get<PaymentsConfigsRepository>(
      PaymentsConfigsRepository,
    );
    createPaymentConfigService = module.get<CreatePaymentConfigService>(
      CreatePaymentConfigService,
    );
  });

  it('should be defined', () => {
    expect(createPaymentConfigService).toBeDefined();
  });

  it('should be able to create payment configs', async () => {
    const result = await createPaymentConfigService.execute({
      createPaymentConfig: createPaymentsConfigsMock,
    });

    expect(result.name).toEqual(createPaymentsConfigsMock.name);
    expect(result.key).toEqual(createPaymentsConfigsMock.key);
    expect(result.id).toBeTruthy();
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(paymentsConfigsRepository, 'createMany')
      .mockRejectedValueOnce('Error');
    try {
      await createPaymentConfigService.execute({
        createPaymentConfig: createPaymentsConfigsMock,
      });
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
