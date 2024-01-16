import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { PaginationRequest } from '@domain/dtos/pagination';

@Injectable()
export class GetAllSubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}

  async execute(params: PaginationRequest) {
    try {
      const subscriptions = await this.subscriptionsRepository.getAll(params);

      return subscriptions;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
