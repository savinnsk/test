import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { Plan, PlanDocument } from '@domain/entities/plan/plan.schema';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { Document, Types } from 'mongoose';

@Injectable()
export class InMemoryPlansRepository implements PlansRepository {
  plans: PlanDocument[] = [];

  async create(_plan: CreatePlanDto): Promise<PlanDocument> {
    const plan = {
      ..._plan,
      id: randomUUID(),
      intervalName: 'Mensal',
    } as any as PlanDocument;

    this.plans.push(plan);

    return plan;
  }

  findByPlanId(
    id: string,
  ): Promise<Document<unknown, any, Plan> & Plan & { _id: Types.ObjectId }> {
    throw new Error('Method not implemented.');
  }

  async getAll() {
    return {
      content: this.plans,
    };
  }

  async find(id: string) {
    const plan = this.plans.find((plan) => plan.id == id);

    return plan;
  }

  async update(_plan: UpdatePlanDto, id: string) {
    const plan = this.plans.find((plan) => plan.id == id);

    const planUpdated = { ...plan, ..._plan } as PlanDocument;

    return planUpdated;
  }
}
