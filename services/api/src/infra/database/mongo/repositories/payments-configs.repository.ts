import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import {
  PaymentConfig,
  PaymentConfigDocument,
} from '@domain/entities/payment-config/payment-config';

@Injectable()
export class MongoPaymentsConfigsRepository
  implements PaymentsConfigsRepository
{
  constructor(
    @InjectModel(PaymentConfig.name)
    private readonly paymentModel: Model<PaymentConfigDocument>,
  ) {}

  async deleteMany({ paymentsConfigs }): Promise<any> {
    const ids = paymentsConfigs.map((paymentConfig) => paymentConfig.id);
    return await this.paymentModel.deleteMany({ _id: { $in: ids } });
  }

  async findById(id: string): Promise<PaymentConfigDocument | null> {
    return this.paymentModel.findById(id);
  }

  async create({
    paymentConfig,
  }): Promise<
    Document<unknown, any, PaymentConfig> &
      PaymentConfig & { _id: Types.ObjectId }
  > {
    return this.paymentModel.create(paymentConfig);
  }

  createMany({
    paymentsConfigs,
  }): Promise<
    (Document<unknown, any, PaymentConfig> &
      PaymentConfig & { _id: Types.ObjectId })[]
  > {
    return this.paymentModel.insertMany(paymentsConfigs);
  }
}
