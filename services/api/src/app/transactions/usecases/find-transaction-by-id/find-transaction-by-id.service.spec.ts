import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindTransactionByIdService } from './find-transaction-by-id.service';

const ID_MOCK = 'id-fake';

describe('FindTransactionByIdService', () => {
  let findTransactionByIdService: FindTransactionByIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTransactionByIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    findTransactionByIdService = module.get<FindTransactionByIdService>(
      FindTransactionByIdService,
    );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );

    await transactionsRepository.create({
      transaction: { ...createCreditCardTransaction },
      id: ID_MOCK,
    });
    await transactionsRepository.create({
      transaction: { ...createCreditCardTransaction },
    });
  });

  it('should be defined', () => {
    expect(findTransactionByIdService).toBeDefined();
  });

  it('should be able to find transaction by id', async () => {
    const result = await findTransactionByIdService.execute(ID_MOCK);

    expect(result.id).toEqual(ID_MOCK);
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'findById')
      .mockRejectedValueOnce('Error');
    try {
      await findTransactionByIdService.execute(ID_MOCK);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
