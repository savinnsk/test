import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionIdService } from './update-transaction-id.service';

const TRANSACTION_ID_MOCK = 'transaction-id-fake';
const ID_MOCK = 'id-fake';

describe('UpdateTransactionIdService', () => {
  let updateTransactionIdService: UpdateTransactionIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updateTransactionIdService = module.get<UpdateTransactionIdService>(
      UpdateTransactionIdService,
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
    expect(updateTransactionIdService).toBeDefined();
  });

  it('should be able to update transaction id by id', async () => {
    const result = await updateTransactionIdService.execute(
      ID_MOCK,
      TRANSACTION_ID_MOCK,
    );

    expect(result.id).toEqual(ID_MOCK);
    expect(result.transactionId).toEqual(TRANSACTION_ID_MOCK);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'updateTransactionId')
      .mockRejectedValueOnce('Error');
    try {
      await updateTransactionIdService.execute(ID_MOCK, TRANSACTION_ID_MOCK);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
