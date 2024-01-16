import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { PaginationRequest } from '@domain/dtos/pagination';

@Injectable()
export class GetAllPlansService {
  constructor(private readonly plansRepository: PlansRepository) {}
  async execute(params: PaginationRequest) {
    try {
      const plans = await this.plansRepository.getAll(params);

      return plans;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
