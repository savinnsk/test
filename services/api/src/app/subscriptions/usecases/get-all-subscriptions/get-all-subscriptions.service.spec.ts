import { Test, TestingModule } from '@nestjs/testing';

import { GetAllSubscriptionsService } from './get-all-subscriptions.service';
import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { subscriptionMock } from '@common/mocks/subscription.mock';
import { InMemorySubscriptionsRepository } from '@infra/database/in-memory/repositories/subscription.repository';

describe('Get all subscriptions service', () => {
  let getAllSubscriptionsService: GetAllSubscriptionsService;
  let subscriptionsRepository: SubscriptionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllSubscriptionsService,
        {
          provide: SubscriptionsRepository,
          useClass: InMemorySubscriptionsRepository,
        },
      ],
    }).compile();

    getAllSubscriptionsService = module.get<GetAllSubscriptionsService>(
      GetAllSubscriptionsService,
    );

    subscriptionsRepository = module.get<SubscriptionsRepository>(
      SubscriptionsRepository,
    );

    await subscriptionsRepository.create(subscriptionMock);
  });

  it('should be defined', () => {
    expect(getAllSubscriptionsService).toBeDefined();
  });

  it('should return all subscriptions', async () => {
    const subscriptions = await getAllSubscriptionsService.execute();

    expect(subscriptions).toBeTruthy();
    expect(subscriptions.length).toBeTruthy();
  });
});
