import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientService } from './delete-client.service';

const ID_MOCK = 'client-fake-id';

describe('DeleteClientService', () => {
  let deleteClientService: DeleteClientService;
  let clientsRepository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClientService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
      ],
    }).compile();

    deleteClientService = module.get<DeleteClientService>(DeleteClientService);
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    clientsRepository.create({ client: createClientMock, id: ID_MOCK });
  });

  it('should be defined', () => {
    expect(deleteClientService).toBeDefined();
  });

  it('should be able to delete a client', async () => {
    const oldResult = await clientsRepository.findById(ID_MOCK);
    await deleteClientService.execute(ID_MOCK);
    const result = await clientsRepository.findAll();

    expect(oldResult).toBeTruthy();
    expect(result).toHaveLength(0);
  });

  it('should be able to return not found exception if client not exists', async () => {
    try {
      await deleteClientService.execute(ID_MOCK);
    } catch (err) {
      expect(err.message).toEqual('Client not found');
    }
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'delete').mockRejectedValueOnce('Error');
    try {
      await deleteClientService.execute(ID_MOCK);
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
