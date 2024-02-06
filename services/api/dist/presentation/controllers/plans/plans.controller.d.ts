/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { Client } from '@domain/entities/client/client.schema';
import { CreatePlanService } from '@app/plans/usecases/create-plan/create-plan.service';
import { GetAllPlansService } from '@app/plans/usecases/get-all-plans/get-all-plans.service';
import { FindPlanService } from '@app/plans/usecases/find-plan/find-plan.service';
import { UpdatePlanService } from '@app/plans/usecases/update-plan/update-plan.service';
import { Response } from 'express';
export declare class PlansController {
    private readonly createPlansService;
    private readonly getAllPlansService;
    private readonly findPlanService;
    private readonly updatePlanService;
    constructor(createPlansService: CreatePlanService, getAllPlansService: GetAllPlansService, findPlanService: FindPlanService, updatePlanService: UpdatePlanService);
    createPlan(plan: CreatePlanDto, user: Client): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/plan/plan.schema").Plan> & import("../../../domain/entities/plan/plan.schema").Plan & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(response: Response, user: Client, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/plan/plan.schema").Plan> & import("../../../domain/entities/plan/plan.schema").Plan & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, data: UpdatePlanDto, user: Client): Promise<any>;
}
