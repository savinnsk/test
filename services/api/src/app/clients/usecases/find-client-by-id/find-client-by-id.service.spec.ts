import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindClientByIdService } from './find-client-by-id.service';

const ID_MOCK = 'client-fake-id';

describe('FindClientByIdService', () => {
  let findClientByIdService: FindClientByIdService;
  let clientsRepository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindClientByIdService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
      ],
    }).compile();

    findClientByIdService = module.get<FindClientByIdService>(
      FindClientByIdService,
    );
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    await clientsRepository.create({ client: createClientMock, id: ID_MOCK });
  });

  it('should be defined', () => {
    expect(findClientByIdService).toBeDefined();
  });

  it('should be able to get a client by id', async () => {
    const result = await findClientByIdService.execute(ID_MOCK);

    expect(result).toBeTruthy();
    expect(result.name).toEqual(createClientMock.name);
    expect(result.apiKey).toEqual(createClientMock.apiKey);
    expect(result.id).toEqual(ID_MOCK);
    expect(result.paymentsConfigs).toHaveLength(1);
  });

  it('should be able to return null if id not exists', async () => {
    const result = await findClientByIdService.execute('johndoe');

    expect(result).toBeNull();
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'findById').mockRejectedValueOnce('Error');
    try {
      await findClientByIdService.execute(ID_MOCK);
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
