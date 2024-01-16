import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { createClientMock } from '@common/mocks/clients.mock';
import { InMemoryClientsRepository } from '@infra/database/in-memory/repositories/clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientService } from './update-client.service';

const ID_MOCK = 'client-fake-id';

describe('UpdateClientService', () => {
  let updateClientService: UpdateClientService;
  let clientsRepository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientService,
        { provide: ClientsRepository, useClass: InMemoryClientsRepository },
      ],
    }).compile();

    updateClientService = module.get<UpdateClientService>(UpdateClientService);
    clientsRepository = module.get<ClientsRepository>(ClientsRepository);

    await clientsRepository.create({ client: createClientMock, id: ID_MOCK });
  });

  it('should be defined', () => {
    expect(updateClientService).toBeDefined();
  });

  it('should be able to update a client by id', async () => {
    const result = await updateClientService.execute({
      updateClientDto: { name: 'Nome Atualizado' },
      id: ID_MOCK,
    });

    expect(result).toBeTruthy();
    expect(result.name).toEqual('Nome Atualizado');
    expect(result.apiKey).toEqual(createClientMock.apiKey);
    expect(result.id).toEqual(ID_MOCK);
    expect(result.paymentsConfigs).toHaveLength(1);
  });

  it('should be able to return not found exception if id not exists', async () => {
    try {
      await updateClientService.execute({
        updateClientDto: { name: 'Nome Atualizado' },
        id: 'ID_THAT_NOT_EXISTS',
      });
    } catch (err) {
      expect(err.message).toEqual('Client not found');
    }
  });

  it('should be able to return internal server exception if client repository fails', async () => {
    jest.spyOn(clientsRepository, 'update').mockRejectedValueOnce('Error');
    try {
      await updateClientService.execute({
        updateClientDto: {},
        id: ID_MOCK,
      });
    } catch (err) {
      expect(err.message).toEqual('Internal Server Error');
    }
  });
});
