import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { Plan, PlanDocument } from '@domain/entities/plan/plan.schema';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { Document, Types } from 'mongoose';
export declare class InMemoryPlansRepository implements PlansRepository {
    plans: PlanDocument[];
    create(_plan: CreatePlanDto): Promise<PlanDocument>;
    findByPlanId(id: string): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    }>;
    getAll(): Promise<{
        content: (Document<unknown, any, Plan> & Plan & {
            _id: Types.ObjectId;
        })[];
    }>;
    find(id: string): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    }>;
    update(_plan: UpdatePlanDto, id: string): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    }>;
}
