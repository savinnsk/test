import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { FindTransactionsByClientService } from './find-transactions-by-client-.service';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InternalServerErrorException } from '@nestjs/common';

const ID_MOCK = 'id-fake';
const CLIENT_ID_MOCK = 'client-id-fake';
const CLIENT_ID_MOCK_2 = 'client-id-fake-2';

describe('FindTransactionByClientService', () => {
  let findTransactionsByClientService: FindTransactionsByClientService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTransactionsByClientService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    findTransactionsByClientService =
      module.get<FindTransactionsByClientService>(
        FindTransactionsByClientService,
      );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );

    const transaction1 = {
      ...createCreditCardTransaction,
      client: { _id: CLIENT_ID_MOCK },
    };
    await transactionsRepository.create({
      transaction: transaction1,
      id: ID_MOCK,
    });

    const transaction2 = {
      ...createCreditCardTransaction,
      client: { _id: CLIENT_ID_MOCK },
    };
    await transactionsRepository.create({
      transaction: transaction2,
      id: ID_MOCK,
    });

    const transaction3 = {
      ...createCreditCardTransaction,
      client: { _id: CLIENT_ID_MOCK },
    };
    await transactionsRepository.create({
      transaction: transaction3,
      id: ID_MOCK,
    });
  });

  it('should be defined', () => {
    expect(findTransactionsByClientService).toBeDefined();
  });

  it('should be able to find transaction by client', async () => {
    const transactions = await findTransactionsByClientService.execute(
      CLIENT_ID_MOCK,
    );
    expect(transactions).toHaveLength(3);

    const transaction = transactions[0];
    expect(transaction.id).toBe(ID_MOCK);
    expect(transaction.client._id).toBe(CLIENT_ID_MOCK);
  });

  it('should be able to find transaction by client and return empty array', async () => {
    const transactions = await findTransactionsByClientService.execute(
      CLIENT_ID_MOCK_2,
    );
    expect(transactions).toHaveLength(0);
  });
});
