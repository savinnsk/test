import { Document, Model, Types } from 'mongoose';
import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { Plan, PlanDocument } from '@domain/entities/plan/plan.schema';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { PaginationRequest } from '@domain/dtos/pagination';
export declare class MongoPlansRepository implements PlansRepository {
    private readonly planModel;
    constructor(planModel: Model<PlanDocument>);
    findByPlanId(id: string): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    }>;
    create(plan: CreatePlanDto): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAll(params: PaginationRequest): Promise<{
        content: (Document<unknown, any, Plan> & Plan & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
        total_items: number;
        page: number;
    }>;
    find(id: string): Promise<Document<unknown, any, Plan> & Plan & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    update(data: UpdatePlanDto, id: string): Promise<PlanDocument>;
}
