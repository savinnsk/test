import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { InMemoryPaymentsConfigsRepository } from '@infra/database/in-memory/repositories/payments-configs.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientService } from './create-client.service';

describe('CreateClientService', () => {
  let createClientService: CreateClientService;
  let clientsRepository: ClientsRepository;
  let paymentsConfigsRepository: PaymentsConfigsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
        {
          provide: PaymentsConfigsRepository,
          useClass: InMemoryPaymentsConfigsRepository,
        },
      ],
    }).compile();

    createClientService = module.get<CreateClientService>(CreateClientService);
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);
    paymentsConfigsRepository = module.get<PaymentsConfigsRepository>(
      PaymentsConfigsRepository,
    );
  });

  it('should be defined', () => {
    expect(createClientService).toBeDefined();
  });

  it('should be able to create a new client', async () => {
    const result = await createClientService.execute({
      createClientDto: createClientMock,
    });

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
    expect(result.name).toEqual(createClientMock.name);
    expect(result.apiKey).toBeTruthy();
    expect(result.apiKey).toMatch(new RegExp('pph_*'));
    expect(result.paymentsConfigs).toHaveLength(1);
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'create').mockRejectedValueOnce('Error');
    try {
      await createClientService.execute({
        createClientDto: createClientMock,
      });
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });

  it('should be able to return internal server exception if payment config repository fails', async () => {
    jest
      .spyOn(paymentsConfigsRepository, 'createMany')
      .mockRejectedValueOnce('Error');
    try {
      await createClientService.execute({
        createClientDto: createClientMock,
      });
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
