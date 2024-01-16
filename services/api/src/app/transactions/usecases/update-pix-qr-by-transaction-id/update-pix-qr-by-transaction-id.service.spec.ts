import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { pixMock } from '@common/mocks/pix.mock';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePixQrByTransactionIdService } from './update-pix-qr-by-transaction-id.service';

const TRANSACTION_ID_MOCK = 'transaction-id-fake';
const ID_MOCK = 'id-fake';

describe('UpdatePixQrByTransactionIdService', () => {
  let updatePixQrByTransactionIdService: UpdatePixQrByTransactionIdService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePixQrByTransactionIdService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updatePixQrByTransactionIdService =
      module.get<UpdatePixQrByTransactionIdService>(
        UpdatePixQrByTransactionIdService,
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
    expect(updatePixQrByTransactionIdService).toBeDefined();
  });

  it('should be able to update pix by transaction id', async () => {
    await updatePixQrByTransactionIdService.execute(
      TRANSACTION_ID_MOCK,
      pixMock,
    );
    const result = await transactionsRepository.findById(ID_MOCK);

    expect(result.id).toEqual(ID_MOCK);
    expect(result.transactionId).toEqual(TRANSACTION_ID_MOCK);
    expect(result.pix).toBeTruthy();
    expect(result.pix).toEqual(pixMock);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'updatePixQrByTransactionId')
      .mockRejectedValueOnce('Error');
    try {
      await updatePixQrByTransactionIdService.execute(
        TRANSACTION_ID_MOCK,
        pixMock,
      );
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
