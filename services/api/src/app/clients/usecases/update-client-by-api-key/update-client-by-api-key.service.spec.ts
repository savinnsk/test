import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { InMemoryPaymentsConfigsRepository } from '@infra/database/in-memory/repositories/payments-configs.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientByApiKeyService } from './update-client-by-api-key.service';

const API_KEY_MOCK = createClientMock.apiKey;

describe('UpdateClientByApiKeyService', () => {
  let updateClientByApiKeyService: UpdateClientByApiKeyService;
  let clientsRepository: ClientsRepository;
  let paymentsConfigsRepository: PaymentsConfigsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientByApiKeyService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
        {
          provide: PaymentsConfigsRepository,
          useClass: InMemoryPaymentsConfigsRepository,
        },
      ],
    }).compile();

    updateClientByApiKeyService = module.get<UpdateClientByApiKeyService>(
      UpdateClientByApiKeyService,
    );
    paymentsConfigsRepository = module.get<PaymentsConfigsRepository>(
      PaymentsConfigsRepository,
    );
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    await clientsRepository.create({ client: createClientMock });
  });

  it('should be defined', () => {
    expect(updateClientByApiKeyService).toBeDefined();
  });

  it('should be able to update a client by api key', async () => {
    const result = await updateClientByApiKeyService.execute({
      updateClientDto: { name: 'Nome Atualizado', paymentsConfigs: [] },
      apiKey: API_KEY_MOCK,
    });

    expect(result).toBeTruthy();
    expect(result.name).toEqual('Nome Atualizado');
    expect(result.apiKey).toEqual(createClientMock.apiKey);
    expect(result.id).toBeTruthy();
    expect(result.paymentsConfigs).toHaveLength(0);
  });

  it('should be able to return not found exception if api key not exists', async () => {
    try {
      await updateClientByApiKeyService.execute({
        updateClientDto: { name: 'Nome Atualizado', paymentsConfigs: [] },
        apiKey: API_KEY_MOCK,
      });
    } catch (err) {
      expect(err.message).toEqual('Client not found');
    }
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'update').mockRejectedValueOnce('Error');
    try {
      await updateClientByApiKeyService.execute({
        updateClientDto: { name: 'Nome Atualizado', paymentsConfigs: [] },
        apiKey: API_KEY_MOCK,
      });
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });

  it('should be able to return internal server exception if payment config repository fails', async () => {
    jest
      .spyOn(paymentsConfigsRepository, 'deleteMany')
      .mockRejectedValueOnce('Error');

    try {
      await updateClientByApiKeyService.execute({
        updateClientDto: { name: 'Nome Atualizado', paymentsConfigs: [] },
        apiKey: API_KEY_MOCK,
      });
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
