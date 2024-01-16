import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';

@Injectable()
export class FindSubscriptionService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}
  async execute(
    id: string,
    params: { throwErrors?: boolean } = { throwErrors: true },
  ) {
    try {
      const subscription = await this.subscriptionsRepository.find(id);

      if (!subscription && params.throwErrors) {
        throw new NotFoundException('Subscription not found.');
      }

      return subscription;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
