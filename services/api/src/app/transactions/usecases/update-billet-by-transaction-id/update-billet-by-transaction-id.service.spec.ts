import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { billetMock } from '@common/mocks/billet.mock';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBilletByTransactionIdService } from './update-billet-by-transaction-id.service';

const TRANSACTION_ID_MOCK = 'transaction-id-fake';
const ID_MOCK = 'id-fake';

describe('UpdateBilletByTransactionIdService', () => {
  let updateBilletByTransactionIdService: UpdateBilletByTransactionIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBilletByTransactionIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updateBilletByTransactionIdService =
      module.get<UpdateBilletByTransactionIdService>(
        UpdateBilletByTransactionIdService,
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
    await transactionsRepository.updateTransactionId({
      id: ID_MOCK,
      transactionId: TRANSACTION_ID_MOCK,
    });
  });

  it('should be defined', () => {
    expect(updateBilletByTransactionIdService).toBeDefined();
  });

  it('should be able to update billet by transaction id', async () => {
    await updateBilletByTransactionIdService.execute(
      TRANSACTION_ID_MOCK,
      billetMock,
    );
    const result = await transactionsRepository.findById(ID_MOCK);

    expect(result.id).toEqual(ID_MOCK);
    expect(result.transactionId).toEqual(TRANSACTION_ID_MOCK);
    expect(result.billet).toBeTruthy();
    expect(result.billet).toEqual(billetMock);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'updateBilletByTransactionId')
      .mockRejectedValueOnce('Error');
    try {
      await updateBilletByTransactionIdService.execute(
        TRANSACTION_ID_MOCK,
        billetMock,
      );
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
