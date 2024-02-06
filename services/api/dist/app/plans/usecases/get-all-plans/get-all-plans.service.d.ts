import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { PaginationRequest } from '@domain/dtos/pagination';
export declare class GetAllPlansService {
    private readonly plansRepository;
    constructor(plansRepository: PlansRepository);
    execute(params: PaginationRequest): Promise<import("@domain/dtos/pagination").PaginationResponse>;
}
