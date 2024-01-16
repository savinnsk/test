import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { CreatePaymentConfigDto } from '@domain/dtos/payment-config/create-payment-config.dto';
import { PaymentConfigDocument } from '@domain/entities/payment-config/payment-config';

interface IPaymentConfigService {
  createPaymentConfig: CreatePaymentConfigDto;
}

@Injectable()
export class CreatePaymentConfigService {
  constructor(
    private readonly paymentConfigRepository: PaymentsConfigsRepository,
  ) {}

  async execute({
    createPaymentConfig,
  }: IPaymentConfigService): Promise<PaymentConfigDocument> {
    try {
      const paymentConfig = await this.paymentConfigRepository.create({
        paymentConfig: createPaymentConfig,
      });

      return paymentConfig;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
