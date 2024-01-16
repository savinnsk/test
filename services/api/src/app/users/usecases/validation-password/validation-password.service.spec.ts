import { HashingAlgorithm } from '@common/enums/hash.enum';
import { HashService } from '@common/hash/hash.service';
import { UserDocument } from '@domain/entities/user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPasswordService } from './validation-password.service';

describe('ValidationPasswordService', () => {
  let validationPasswordService: ValidationPasswordService;
  let hashService: HashService;
  let hash: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationPasswordService, HashService],
    }).compile();

    validationPasswordService = module.get<ValidationPasswordService>(
      ValidationPasswordService,
    );
    hashService = module.get<HashService>(HashService);

    hash = await hashService.hash('123456', HashingAlgorithm.bcrypt);
  });

  it('should be defined', () => {
    expect(validationPasswordService).toBeDefined();
  });

  it('should be able to return true if the password is valid', async () => {
    const result = await validationPasswordService.execute({
      password: '123456',
      user: { password: hash } as UserDocument,
    });

    expect(result).toBeTruthy();
  });

  it('should be able to return false if the password is invalid', async () => {
    const result = await validationPasswordService.execute({
      password: '1234567',
      user: { password: hash } as UserDocument,
    });

    expect(result).toBeFalsy();
  });

  it('should be able to return a exception if hashService fails', async () => {
    jest.spyOn(hashService, 'compare').mockRejectedValueOnce('Error');

    try {
      await validationPasswordService.execute({
        password: '1234567',
        user: { password: hash } as UserDocument,
      });
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
