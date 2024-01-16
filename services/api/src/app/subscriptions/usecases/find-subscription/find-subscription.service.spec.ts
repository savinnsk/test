import { Test, TestingModule } from '@nestjs/testing';

import { FindSubscriptionService } from './find-subscription.service';
import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { subscriptionMock } from '@common/mocks/subscription.mock';
import { InMemorySubscriptionsRepository } from '@infra/database/in-memory/repositories/subscription.repository';
import { SubscriptionCreatedDto } from '@domain/dtos/substription/subscription-created.dto';

describe('Find subscription service', () => {
  let findSubscriptionService: FindSubscriptionService;
  let subscriptionsRepository: SubscriptionsRepository;
  let subscription: SubscriptionCreatedDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindSubscriptionService,
        {
          provide: SubscriptionsRepository,
          useClass: InMemorySubscriptionsRepository,
        },
      ],
    }).compile();

    findSubscriptionService = module.get<FindSubscriptionService>(
      FindSubscriptionService,
    );

    subscriptionsRepository = module.get<SubscriptionsRepository>(
      SubscriptionsRepository,
    );

    subscription = (await subscriptionsRepository.create(
      subscriptionMock,
    )) as any;
  });

  it('should be defined', () => {
    expect(findSubscriptionService).toBeDefined();
  });

  it('should found an subscription by id', async () => {
    const { id } = subscription;

    const subscriptionFound = await findSubscriptionService.execute(id);

    expect(subscriptionFound).toBeTruthy();
    expect(subscriptionFound.paymentGateway).toEqual(
      subscriptionMock.paymentGateway,
    );
  });

  it('should be able to return not found exception when subscription dont exists', async () => {
    jest.spyOn(subscriptionsRepository, 'find');
    try {
      await findSubscriptionService.execute('xxxyyy');
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });
});
