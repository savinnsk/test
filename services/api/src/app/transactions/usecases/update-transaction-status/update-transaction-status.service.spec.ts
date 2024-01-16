import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindTransactionByIdService } from '../find-transaction-by-id/find-transaction-by-id.service';
import { UpdateTransactionStatusService } from './update-transaction-status.service';

const ID_MOCK = 'id-fake';

describe('UpdateTransactionStatusService', () => {
  let updateTransactionStatusService: UpdateTransactionStatusService;
  let findTransactionByIdService: FindTransactionByIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionStatusService,
        FindTransactionByIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updateTransactionStatusService = module.get<UpdateTransactionStatusService>(
      UpdateTransactionStatusService,
    );
    findTransactionByIdService = module.get<FindTransactionByIdService>(
      FindTransactionByIdService,
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
    expect(updateTransactionStatusService).toBeDefined();
  });

  it('should be able to update transaction id by id', async () => {
    const result = await updateTransactionStatusService.execute(
      ID_MOCK,
      'authorized',
    );

    expect(result.id).toEqual(ID_MOCK);
    expect(result.statusLog).toHaveLength(1);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(findTransactionByIdService, 'execute')
      .mockRejectedValueOnce('Error');
    try {
      await updateTransactionStatusService.execute(ID_MOCK, 'authorized');
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
