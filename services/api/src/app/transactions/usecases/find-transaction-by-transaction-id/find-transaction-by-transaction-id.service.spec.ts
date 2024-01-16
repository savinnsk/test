import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { FindTransactionByTransactionIdService } from './find-transaction-by-transaction-id.service';

const TRANSACTION_ID_MOCK = 'transaction-id-fake';
const ID_MOCK = 'id-fake';

describe('FindTransactionByTransactionIdService', () => {
  let findTransactionByTransactionIdService: FindTransactionByTransactionIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTransactionByTransactionIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    findTransactionByTransactionIdService =
      module.get<FindTransactionByTransactionIdService>(
        FindTransactionByTransactionIdService,
      );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );

    await transactionsRepository.create({
      transaction: {
        ...createCreditCardTransaction,
        paymentGateway: PaymentGateway.Pagarme,
      },
      id: ID_MOCK,
    });
    await transactionsRepository.updateTransactionId({
      id: ID_MOCK,
      transactionId: TRANSACTION_ID_MOCK,
    });
  });

  it('should be defined', () => {
    expect(findTransactionByTransactionIdService).toBeDefined();
  });

  it('should be able to find transaction by transaction id', async () => {
    const result = await findTransactionByTransactionIdService.execute(
      TRANSACTION_ID_MOCK,
    );

    expect(result.id).toEqual(ID_MOCK);
    expect(result.transactionId).toEqual(TRANSACTION_ID_MOCK);
    expect((result as any).createdAt).toBeTruthy();
    expect((result as any).updatedAt).toBeTruthy();
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'findById')
      .mockRejectedValueOnce('Error');
    try {
      await findTransactionByTransactionIdService.execute(TRANSACTION_ID_MOCK);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
