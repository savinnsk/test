import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTransactionsService } from './find-all-transactions.service';

describe('FindAllTransactionsService', () => {
  let findAllTransactionsService: FindAllTransactionsService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTransactionsService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    findAllTransactionsService = module.get<FindAllTransactionsService>(
      FindAllTransactionsService,
    );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );

    await transactionsRepository.create({
      transaction: { ...createCreditCardTransaction },
    });
    await transactionsRepository.create({
      transaction: { ...createCreditCardTransaction },
    });
  });

  it('should be defined', () => {
    expect(findAllTransactionsService).toBeDefined();
  });

  it('should be able to find all transaction', async () => {
    const result = await findAllTransactionsService.execute();

    expect(result).toHaveLength(2);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'findAll')
      .mockRejectedValueOnce('Error');
    try {
      await findAllTransactionsService.execute();
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
