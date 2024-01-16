import { TransactionsRepository } from '@app/transactions/repositories/transactions.repository';
import { createdClient } from '@common/mocks/clients.mock';
import {
  createBilletTransaction,
  createCreditCardTransaction,
  createPixTransaction,
} from '@common/mocks/transaction.mock';
import { InMemoryTransactionsRepository } from '@infra/database/in-memory/repositories/transactions.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';

describe('CreateTransactionService', () => {
  let createTransactionService: CreateTransactionService;
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: TransactionsRepository,
          useClass: InMemoryTransactionsRepository,
        },
      ],
    }).compile();

    createTransactionService = module.get<CreateTransactionService>(
      CreateTransactionService,
    );
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );
  });

  it('should be defined', () => {
    expect(createTransactionService).toBeDefined();
  });

  it('should be able to create a credit card transaction', async () => {
    const result = await createTransactionService.execute({
      client: createdClient,
      transaction: createCreditCardTransaction,
    });

    expect(result.creditCard).toBeTruthy();
    expect(result.client).toBeTruthy();
    expect(result.creditCard.lastFourNumbers).toHaveLength(4);
    expect(result.creditCard.bin).toHaveLength(6);
    expect(result.statusLog).toHaveLength(1);
    expect(result.currentStatus).toEqual('created');
  });

  it('should be able to create a billet transaction', async () => {
    const result = await createTransactionService.execute({
      client: createdClient,
      transaction: createBilletTransaction,
    });

    expect(result.id).toBeTruthy();
    expect(result.client).toBeTruthy();
    expect(result.creditCard).toBeFalsy();
    expect(result.statusLog).toHaveLength(1);
    expect(result.currentStatus).toEqual('created');
  });

  it('should be able to create a pix transaction', async () => {
    const result = await createTransactionService.execute({
      client: createdClient,
      transaction: createPixTransaction,
    });

    expect(result.id).toBeTruthy();
    expect(result.client).toBeTruthy();
    expect(result.creditCard).toBeFalsy();
    expect(result.statusLog).toHaveLength(1);
    expect(result.currentStatus).toEqual('created');
  });

  it('should be able to return internal server exception when repository fails', async () => {
    jest
      .spyOn(transactionsRepository, 'createInstance')
      .mockRejectedValueOnce('Error');
    try {
      await createTransactionService.execute({
        client: createdClient,
        transaction: createPixTransaction,
      });
    } catch (error) {
      expect(error.message).toEqual('Internal Server Error');
    }
  });
});
