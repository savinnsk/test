import { UsersRepository } from '@app/users/repositories/users.repository';
import { HashService } from '@common/hash/hash.service';
import { createUserMock } from '@common/mocks/users.mock';
import { InMemoryUsersRepository } from '@infra/database/in-memory/repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        HashService,
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository,
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
  });

  it('should be able to persist a user', async () => {
    const result = await createUserService.execute(createUserMock);

    expect(result).toBeTruthy();
    expect(result.email).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.password).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
  });

  it('should be able to return error when repository crashes', async () => {
    jest.spyOn(usersRepository, 'create').mockRejectedValueOnce('Error');
    try {
      await createUserService.execute(createUserMock);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
