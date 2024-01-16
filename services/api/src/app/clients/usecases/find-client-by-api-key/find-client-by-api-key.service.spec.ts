import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindClientByApiKeyService } from './find-client-by-api-key.service';

describe('FindClientByApiKeyService', () => {
  let findClientByApiKeyService: FindClientByApiKeyService;
  let clientsRepository: ClientsRepository;

  let apiKey: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindClientByApiKeyService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
      ],
    }).compile();

    findClientByApiKeyService = module.get<FindClientByApiKeyService>(
      FindClientByApiKeyService,
    );
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    apiKey = (await clientsRepository.create({ client: createClientMock }))
      .apiKey;
  });

  it('should be defined', () => {
    expect(findClientByApiKeyService).toBeDefined();
  });

  it('should be able to get a client by api key', async () => {
    const result = await findClientByApiKeyService.execute(apiKey);

    expect(result).toBeTruthy();
    expect(result.name).toEqual(createClientMock.name);
    expect(result.apiKey).toMatch(createClientMock.apiKey);
    expect(result.paymentsConfigs).toHaveLength(1);
  });

  it('should be able to return null if api key not exists', async () => {
    const result = await findClientByApiKeyService.execute('johndoe');

    expect(result).toBeNull();
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest
      .spyOn(clientsRepository, 'findByApiKey')
      .mockRejectedValueOnce('Error');
    try {
      await findClientByApiKeyService.execute(apiKey);
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
