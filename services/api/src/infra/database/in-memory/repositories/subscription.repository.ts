import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';

@Injectable()
export class InMemorySubscriptionsRepository
  implements SubscriptionsRepository
{
  subscriptions: SubscriptionDocument[] = [];

  async create(
    _subscription: CreateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    const subscription = {
      ..._subscription,
      id: randomUUID(),
    } as any as SubscriptionDocument;

    this.subscriptions.push(subscription);

    return subscription;
  }

  async getAll(params?) {
    return {
      content: this.subscriptions,
    };
  }

  async find(id: string) {
    const subscription = this.subscriptions.find(
      (subscription) => subscription.id == id,
    );

    return subscription;
  }

  async update(_subscription: UpdateSubscriptionDto, id: string) {
    const subscription = this.subscriptions.find(
      (subscription) => subscription.id == id,
    );

    const subscriptionUpdated = {
      ...subscription,
      ..._subscription,
    } as SubscriptionDocument;

    return subscriptionUpdated;
  }

  async partialUpdate(_subscription: any, id: string) {
    const subscription = this.subscriptions.find(
      (subscription) => subscription.id == id,
    );

    const subscriptionUpdated = {
      ...subscription,
      ..._subscription,
    } as any;

    return subscriptionUpdated;
  }
}
