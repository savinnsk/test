import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import {
  Subscription,
  SubscriptionDocument,
} from '@domain/entities/subscription/subscription.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { PaginationRequest } from '@domain/dtos/pagination';

@Injectable()
export class MongoSubscriptionsRepository implements SubscriptionsRepository {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(subscription: CreateSubscriptionDto) {
    try {
      const subscriptionCreated = await this.subscriptionModel.create(
        subscription,
      );

      return subscriptionCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAll(params: PaginationRequest) {
    try {
      const query = this.subscriptionModel.find();

      if (params.payerName) {
        query.where('payer.firstName', new RegExp(params.payerName, 'i'));
      }

      const total = await this.subscriptionModel.countDocuments();

      if (!params.page) {
        params.limit = total;
        params.page = 1;
      }

      const subscriptions = await query
        .find({ 'associatedPlan.client.apiKey': params.user.apiKey })
        .limit(params.limit * 1)
        .skip((params.page - 1) * params.limit)
        .exec();

      return {
        content: subscriptions,
        total_items: total,
        page: params.page,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(id: string) {
    try {
      const where = [{ subscriptionId: id }] as any;

      if (isValidObjectId(id)) {
        where.push({ _id: id });
      }

      const subscription = await this.subscriptionModel.findOne({
        $or: [...where],
      });

      return subscription;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    data: UpdateSubscriptionDto,
    id: string,
  ): Promise<SubscriptionDocument> {
    try {
      const subscription = await this.find(id);

      await subscription.updateOne(data).exec();

      const subscriptionUpdated = await this.find(id);
      return subscriptionUpdated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async partialUpdate(
    data: any,
    id: string,
  ): Promise<SubscriptionDocument | any> {
    try {
      const subscription = await this.subscriptionModel
        .findByIdAndUpdate(
          id,
          { ...data },
          {
            new: true,
          },
        )
        .exec();

      return subscription;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
