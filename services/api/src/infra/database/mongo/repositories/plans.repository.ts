import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { Plan, PlanDocument } from '@domain/entities/plan/plan.schema';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { PaginationRequest } from '@domain/dtos/pagination';

@Injectable()
export class MongoPlansRepository implements PlansRepository {
  constructor(
    @InjectModel(Plan.name)
    private readonly planModel: Model<PlanDocument>,
  ) {}

  async findByPlanId(
    id: string,
  ): Promise<Document<unknown, any, Plan> & Plan & { _id: Types.ObjectId }> {
    try {
      const plan = await this.planModel.findOne({ planId: id });

      return plan;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(plan: CreatePlanDto) {
    try {
      const planCreated = await this.planModel.create(plan);

      return planCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAll(params: PaginationRequest) {
    try {
      const total = await this.planModel.countDocuments();

      if (!params.page) {
        params.limit = total;
        params.page = 1;
      }

      const plans = await this.planModel
        .find({ 'client.apiKey': params.user.apiKey })
        .limit(params.limit * 1)
        .skip((params.page - 1) * params.limit)
        .exec();

      return {
        content: plans,
        total_items: total,
        page: params.page,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(id: string) {
    try {
      const plan = await this.planModel.findById(id);

      return plan;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: UpdatePlanDto, id: string): Promise<PlanDocument> {
    try {
      const planUpdated = await this.planModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return planUpdated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
