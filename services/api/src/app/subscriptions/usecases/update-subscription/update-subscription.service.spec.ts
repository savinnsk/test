import { Test, TestingModule } from '@nestjs/testing';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { subscriptionMock } from '@common/mocks/subscription.mock';
import { InMemorySubscriptionsRepository } from '@infra/database/in-memory/repositories/subscription.repository';
import { SubscriptionCreatedDto } from '@domain/dtos/substription/subscription-created.dto';
import { UpdateSubscriptionService } from './update-subscription.service';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { createClientMock } from '@common/mocks/clients.mock';

describe('Update subscription service', () => {
  let updateSubscriptionService: UpdateSubscriptionService;
  let subscriptionsRepository: SubscriptionsRepository;
  let subscription: SubscriptionCreatedDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSubscriptionService,
        {
          provide: SubscriptionsRepository,
          useClass: InMemorySubscriptionsRepository,
        },
      ],
    }).compile();

    updateSubscriptionService = module.get<UpdateSubscriptionService>(
      UpdateSubscriptionService,
    );

    subscriptionsRepository = module.get<SubscriptionsRepository>(
      SubscriptionsRepository,
    );

    subscription = (await subscriptionsRepository.create(
      subscriptionMock,
    )) as any;
  });

  it('should be defined', () => {
    expect(updateSubscriptionService).toBeDefined();
  });

  it('should update a subscription by id', async () => {
    const { id } = subscription;
    const newPaymentGateway = { paymentGateway: PaymentGateway.Pagarme };

    const subscriptionUpdated = await updateSubscriptionService.execute(
      newPaymentGateway,
      id,
      createClientMock as any,
    );

    expect(subscriptionUpdated).toBeTruthy();
    expect(subscriptionUpdated.paymentGateway).toEqual(PaymentGateway.Pagarme);
  });

  it('should be able to return not found exception when subscription dont exists', async () => {
    jest.spyOn(subscriptionsRepository, 'update');
    try {
      await updateSubscriptionService.execute(
        { paymentGateway: PaymentGateway.MercadoPago },
        'xxxyyy',
        createClientMock as any,
      );
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });
});
