import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import {
  createCreditCardTransaction,
  updateTransaction,
} from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionService } from './update-transaction.service';

const ID_MOCK = 'id-fake';

describe('UpdateTransactionService', () => {
  let updateTransactionService: UpdateTransactionService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updateTransactionService = module.get<UpdateTransactionService>(
      UpdateTransactionService,
    );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );

    await transactionsRepository.create({
      transaction: {
        ...createCreditCardTransaction,
      },
      id: ID_MOCK,
    });
  });

  it('should be defined', () => {
    expect(updateTransactionService).toBeDefined();
  });

  it('should be able to update transaction id by id', async () => {
    const result = await updateTransactionService.execute(
      ID_MOCK,
      updateTransaction,
    );

    const expected = {
      id: ID_MOCK,
      statusLog: [],
      ...createCreditCardTransaction,
      ...updateTransaction,
    };

    expect(result).toEqual(expected);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest.spyOn(transactionsRepository, 'update').mockRejectedValueOnce('Error');
    try {
      await updateTransactionService.execute(ID_MOCK, updateTransaction);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });

  it('should be able to throw an error if id not found', async () => {
    try {
      await updateTransactionService.execute('fake-id', updateTransaction);
    } catch (error) {
      expect(error.message).toEqual('Transaction not found');
    }
  });
});
