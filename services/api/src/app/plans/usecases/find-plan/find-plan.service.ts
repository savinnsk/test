import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PlansRepository } from '@app/plans/repositories/plans.repository';

@Injectable()
export class FindPlanService {
  constructor(private readonly plansRepository: PlansRepository) {}
  async execute(id: string) {
    try {
      const plan = await this.plansRepository.find(id);

      if (!plan) {
        throw new NotFoundException('Plan not found.');
      }

      return plan;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
