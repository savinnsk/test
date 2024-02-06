import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { PlanDocument } from '@domain/entities/plan/plan.schema';
export declare abstract class PlansRepository {
    abstract create(plan: CreatePlanDto): Promise<PlanDocument>;
    abstract getAll(params?: PaginationRequest): Promise<PaginationResponse>;
    abstract find(id: string): Promise<PlanDocument>;
    abstract findByPlanId(id: string): Promise<PlanDocument>;
    abstract update(data: UpdatePlanDto, id: string): Promise<PlanDocument>;
}
