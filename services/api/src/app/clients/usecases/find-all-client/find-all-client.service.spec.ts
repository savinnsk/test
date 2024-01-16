import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllClientService } from './find-all-client.service';

const ID_MOCK = 'client-fake-id';

describe('FindAllClientService', () => {
  let findAllClientService: FindAllClientService;
  let clientsRepository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllClientService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
      ],
    }).compile();

    findAllClientService =
      module.get<FindAllClientService>(FindAllClientService);
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    clientsRepository.create({ client: createClientMock, id: ID_MOCK + '-0' });
    clientsRepository.create({ client: createClientMock, id: ID_MOCK + '-1' });
    clientsRepository.create({ client: createClientMock, id: ID_MOCK + '-2' });
  });

  it('should be defined', () => {
    expect(findAllClientService).toBeDefined();
  });

  it('should be able to return all clients', async () => {
    const result = await findAllClientService.execute();
    expect(result).toHaveLength(3);
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'delete').mockRejectedValueOnce('Error');
    try {
      await findAllClientService.execute();
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
