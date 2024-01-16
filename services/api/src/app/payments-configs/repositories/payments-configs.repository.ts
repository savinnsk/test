import { CreatePaymentConfigDto } from '@domain/dtos/payment-config/create-payment-config.dto';
import {
  PaymentConfig,
  PaymentConfigDocument,
} from '@domain/entities/payment-config/payment-config';

export abstract class PaymentsConfigsRepository {
  abstract create(params: {
    paymentConfig: CreatePaymentConfigDto;
    id?: string;
  }): Promise<PaymentConfigDocument>;
  abstract createMany(params: {
    paymentsConfigs: CreatePaymentConfigDto[];
  }): Promise<PaymentConfigDocument[]>;
  abstract findById(id: string): Promise<PaymentConfigDocument | null>;
  abstract deleteMany(params: {
    paymentsConfigs: PaymentConfig[];
  }): Promise<any | null>;
}
