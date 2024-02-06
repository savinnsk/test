"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_key_auth_guard_1 = require("../../../app/auth/guards/api-key-auth.guard");
const update_plan_dto_1 = require("../../../domain/dtos/plan/update-plan.dto");
const plan_doc_1 = require("../../../common/docs/plan/plan.doc");
const create_plan_dto_1 = require("../../../domain/dtos/plan/create-plan.dto");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const client_schema_1 = require("../../../domain/entities/client/client.schema");
const create_plan_doc_1 = require("../../../common/docs/plan/create-plan.doc");
const create_plan_service_1 = require("../../../app/plans/usecases/create-plan/create-plan.service");
const get_all_plans_service_1 = require("../../../app/plans/usecases/get-all-plans/get-all-plans.service");
const find_plan_service_1 = require("../../../app/plans/usecases/find-plan/find-plan.service");
const update_plan_service_1 = require("../../../app/plans/usecases/update-plan/update-plan.service");
let PlansController = class PlansController {
    constructor(createPlansService, getAllPlansService, findPlanService, updatePlanService) {
        this.createPlansService = createPlansService;
        this.getAllPlansService = getAllPlansService;
        this.findPlanService = findPlanService;
        this.updatePlanService = updatePlanService;
    }
    async createPlan(plan, user) {
        console.log('user', user);
        return await this.createPlansService.execute(plan, user);
    }
    async findAll(response, user, page, limit) {
        const plans = await this.getAllPlansService.execute({
            user,
            page,
            limit: limit || 5,
        });
        return response.status(200).send({ plans });
    }
    async findOne(id) {
        return await this.findPlanService.execute(id);
    }
    async update(id, data, user) {
        return await this.updatePlanService.execute(data, id, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: create_plan_doc_1.CreatePlanDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created plan and integrated to gateway',
        type: plan_doc_1.PlanDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all plans',
    }),
    (0, swagger_1.ApiResponse)({
        type: plan_doc_1.PlanDoc,
        isArray: true,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_schema_1.Client, Number, Number]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a plan',
        description: 'Get one plan with id',
    }),
    (0, swagger_1.ApiResponse)({
        type: plan_doc_1.PlanDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a plan',
        description: 'Update one plan with id',
    }),
    (0, swagger_1.ApiResponse)({
        type: plan_doc_1.PlanDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_plan_dto_1.UpdatePlanDto,
        client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "update", null);
PlansController = __decorate([
    (0, swagger_1.ApiTags)('plans'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(api_key_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [create_plan_service_1.CreatePlanService,
        get_all_plans_service_1.GetAllPlansService,
        find_plan_service_1.FindPlanService,
        update_plan_service_1.UpdatePlanService])
], PlansController);
exports.PlansController = PlansController;
//# sourceMappingURL=plans.controller.js.map