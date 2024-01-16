import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Document, Types } from 'mongoose';

import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import {
  PaymentConfig,
  PaymentConfigDocument,
} from '@domain/entities/payment-config/payment-config';

@Injectable()
export class InMemoryPaymentsConfigsRepository
  implements PaymentsConfigsRepository
{
  paymentsConfigs: PaymentConfigDocument[] = [];

  async deleteMany({ paymentsConfigs }): Promise<any> {
    const ids = paymentsConfigs.map((paymentConfig) => paymentConfig.id);
    this.paymentsConfigs = this.paymentsConfigs.filter(
      (paymentConfig) => !ids.includes(paymentConfig.id),
    );
    return;
  }

  async findById(id: string): Promise<PaymentConfigDocument | null> {
    return this.paymentsConfigs.find(
      (paymentConfig) => paymentConfig.id === id,
    );
  }

  async create(params: {
    paymentConfig: any;
    id?: string;
  }): Promise<
    Document<unknown, any, PaymentConfig> &
      PaymentConfig & { _id: Types.ObjectId }
  > {
    const config = {
      ...params.paymentConfig,
      id: params.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any as PaymentConfigDocument;

    this.paymentsConfigs.push(config);
    return config;
  }

  async createMany({
    paymentsConfigs,
  }): Promise<
    (Document<unknown, any, PaymentConfig> &
      PaymentConfig & { _id: Types.ObjectId })[]
  > {
    const configs = [];
    for (const config of paymentsConfigs) {
      const persitedConfig = await this.create({ paymentConfig: config });
      configs.push(persitedConfig);
    }
    return configs as any;
  }
}
