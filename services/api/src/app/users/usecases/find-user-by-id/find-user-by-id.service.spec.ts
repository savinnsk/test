import * as crypto from 'node:crypto';

import { UsersRepository } from '@app/users/repositories/users.repository';
import { createUserMock } from '@common/mocks/users.mock';
import { InMemoryUsersRepository } from '@infra/database/in-memory/repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from './find-user-by-id.service';

const ID_MOCK = 'id-to-teste';

describe('FindUserByIdService', () => {
  let findUserByIdService: FindUserByIdService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
      ],
    }).compile();

    findUserByIdService = module.get<FindUserByIdService>(FindUserByIdService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    usersRepository.create({ user: createUserMock, id: ID_MOCK });
  });

  it('should be defined', () => {
    expect(findUserByIdService).toBeDefined();
  });

  it('should be able to find a user by id', async () => {
    const result = await findUserByIdService.execute(ID_MOCK);

    expect(result).toBeTruthy();
    expect(result.name).toEqual(createUserMock.name);
    expect(result.email).toEqual(createUserMock.email);
    expect(result.id).toEqual(ID_MOCK);
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
  });

  it('should be able to return a not found exception when not found user by id', async () => {
    try {
      await findUserByIdService.execute(crypto.randomUUID());
    } catch (error) {
      expect(error.message).toEqual('User not found');
    }
  });

  it('should be able to return a internal server exception when repository crashes', async () => {
    jest.spyOn(usersRepository, 'findById').mockRejectedValueOnce('Error');

    try {
      await findUserByIdService.execute(ID_MOCK);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
