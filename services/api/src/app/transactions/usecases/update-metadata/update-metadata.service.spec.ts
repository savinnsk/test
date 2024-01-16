import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createCreditCardTransaction } from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMetadataService } from './update-metadata.service';

const TRANSACTION_ID_MOCK = 'transaction-id-fake';
const ID_MOCK = 'id-fake';
const METADATA_MOCK = {
  name: 'Victor',
};

describe('UpdateMetadataService', () => {
  let updateMetadataService: UpdateMetadataService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMetadataService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    updateMetadataService = module.get<UpdateMetadataService>(
      UpdateMetadataService,
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
    expect(updateMetadataService).toBeDefined();
  });

  it('should be able to update metadata by transaction id', async () => {
    await updateMetadataService.execute(TRANSACTION_ID_MOCK, METADATA_MOCK);
    const result = await transactionsRepository.findById(ID_MOCK);

    expect(result.id).toEqual(ID_MOCK);
    expect(result.transactionId).toEqual(TRANSACTION_ID_MOCK);
    expect(result.metadata).toBeTruthy();
    expect(result.metadata).toEqual(METADATA_MOCK);
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'updateMetadata')
      .mockRejectedValueOnce('Error');
    try {
      await updateMetadataService.execute(TRANSACTION_ID_MOCK, METADATA_MOCK);
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
