import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { CreatePaymentConfigDto } from '@domain/dtos/payment-config/create-payment-config.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

interface ICreateManyPaymentConfigService {
  createPaymentsConfigsDto: CreatePaymentConfigDto[];
}

@Injectable()
export class CreateManyPaymentConfigService {
  constructor(
    private readonly paymentsConfigsRepository: PaymentsConfigsRepository,
  ) {}

  async execute({ createPaymentsConfigsDto }: ICreateManyPaymentConfigService) {
    try {
      const paymentsConfigs = await this.paymentsConfigsRepository.createMany({
        paymentsConfigs: createPaymentsConfigsDto,
      });

      return paymentsConfigs;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
