import { UsersRepository } from '@app/users/repositories/users.repository';
import { createUserMock } from '@common/mocks/users.mock';
import { InMemoryUsersRepository } from '@infra/database/in-memory/repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersService } from './find-all-users.service';

describe('FindAllUsersService', () => {
  let findAllUsersService: FindAllUsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUsersService,
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository,
        },
      ],
    }).compile();

    findAllUsersService = module.get<FindAllUsersService>(FindAllUsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    // Cadastrando usuários antes de testar a listagem
    usersRepository.create({ user: createUserMock });
    usersRepository.create({ user: createUserMock });
    usersRepository.create({ user: createUserMock });
  });

  it('should be defined', () => {
    expect(findAllUsersService).toBeDefined();
  });

  it('should be able to find all users', async () => {
    const result = await findAllUsersService.execute();
    expect(result).toHaveLength(3);
  });

  it('should be able to throw error when repository crashes', async () => {
    jest.spyOn(usersRepository, 'findAll').mockRejectedValueOnce('Error');
    try {
      await findAllUsersService.execute();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
