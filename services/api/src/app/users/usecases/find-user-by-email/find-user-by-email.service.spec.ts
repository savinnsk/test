import { UsersRepository } from '@app/users/repositories/users.repository';
import { createUserMock } from '@common/mocks/users.mock';
import { InMemoryUsersRepository } from '@infra/database/in-memory/repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailService } from './find-user-by-email.service';

describe('FindUserByEmailService', () => {
  let findUserByEmailService: FindUserByEmailService;
  let usersRepository: UsersRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
      ],
    }).compile();

    findUserByEmailService = module.get<FindUserByEmailService>(
      FindUserByEmailService,
    );
    usersRepository = module.get<UsersRepository>(UsersRepository);

    usersRepository.create({ user: createUserMock });
  });

  it('should be defined', () => {
    expect(findUserByEmailService).toBeDefined();
  });

  it('should be able to find a user by email', async () => {
    const result = await findUserByEmailService.execute(createUserMock.email);
    expect(result).toBeTruthy();
    expect(result.email).toEqual(createUserMock.email);
  });

  it('should be able to throw not found error when user not exists', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(null);
    try {
      await findUserByEmailService.execute(createUserMock.email);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.message).toEqual('User not found');
    }
  });

  it('should be able to throw internal server error when repository crashes', async () => {
    jest.spyOn(usersRepository, 'findAll').mockRejectedValueOnce('Error');
    try {
      await findUserByEmailService.execute(createUserMock.email);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
