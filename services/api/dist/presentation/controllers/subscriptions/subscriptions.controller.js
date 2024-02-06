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
exports.SubscriptionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_key_auth_guard_1 = require("../../../app/auth/guards/api-key-auth.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const client_schema_1 = require("../../../domain/entities/client/client.schema");
const create_subscription_dto_1 = require("../../../domain/dtos/substription/create-subscription.dto");
const update_subscription_dto_1 = require("../../../domain/dtos/substription/update-subscription.dto");
const create_subscription_service_1 = require("../../../app/subscriptions/usecases/create-subscription/create-subscription.service");
const get_all_subscriptions_service_1 = require("../../../app/subscriptions/usecases/get-all-subscriptions/get-all-subscriptions.service");
const find_subscription_service_1 = require("../../../app/subscriptions/usecases/find-subscription/find-subscription.service");
const update_subscription_service_1 = require("../../../app/subscriptions/usecases/update-subscription/update-subscription.service");
const docs_1 = require("../../../common/docs");
const cancel_subscription_service_1 = require("../../../app/subscriptions/usecases/cancel-subscription/cancel-subscription.service");
const reactivate_subscription_service_1 = require("../../../app/subscriptions/usecases/reactivate-subscription/reactivate-subscription.service");
const renew_subscription_service_1 = require("../../../app/subscriptions/usecases/renew-subscription/renew-subscription.service");
const verify_credit_service_1 = require("../../../app/subscriptions/usecases/verify-credit/verify-credit.service");
let SubscriptionsController = class SubscriptionsController {
    constructor(createSubscriptionService, getAllSubscriptionsService, findSubscriptionService, updateSubscriptionService, cancelSubscriptionService, reactivateSubscriptionService, renewSubscriptionService, verifyCreditService) {
        this.createSubscriptionService = createSubscriptionService;
        this.getAllSubscriptionsService = getAllSubscriptionsService;
        this.findSubscriptionService = findSubscriptionService;
        this.updateSubscriptionService = updateSubscriptionService;
        this.cancelSubscriptionService = cancelSubscriptionService;
        this.reactivateSubscriptionService = reactivateSubscriptionService;
        this.renewSubscriptionService = renewSubscriptionService;
        this.verifyCreditService = verifyCreditService;
    }
    async create(subscription, user) {
        try {
            const subscriptionCreated = await this.createSubscriptionService.execute(subscription, user);
            return subscriptionCreated;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async verifyCredit(subscription, user) {
        try {
            const result = await this.verifyCreditService.execute(subscription, user);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async reactivate(id, user) {
        try {
            const subscriptionCreated = await this.reactivateSubscriptionService.execute(id, user);
            return subscriptionCreated;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async renew(id, user) {
        try {
            const subscriptionCreated = await this.renewSubscriptionService.execute(id, user);
            return subscriptionCreated;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async getAll(response, user, page, limit, payerName) {
        const subscriptions = await this.getAllSubscriptionsService.execute({
            page,
            limit: limit || 5,
            payerName,
            user,
        });
        return response.status(200).send({ subscriptions });
    }
    async findOne(id) {
        return await this.findSubscriptionService.execute(id);
    }
    async update(id, data, user) {
        return await this.updateSubscriptionService.execute(data, id, user);
    }
    async delete(id, user) {
        return await this.cancelSubscriptionService.execute({ id, client: user });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateSubscriptionDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created subscription and integrated to gateway',
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto,
        client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateSubscriptionDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created subscription and integrated to gateway',
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto,
        client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "verifyCredit", null);
__decorate([
    (0, common_1.Patch)(':id/reactivate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateSubscriptionDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created subscription and integrated to gateway',
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "reactivate", null);
__decorate([
    (0, common_1.Patch)(':id/renew'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateSubscriptionDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created subscription and integrated to gateway',
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "renew", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all subscriptions',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.SubscriptionCreatedDoc,
        isArray: true,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('payerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_schema_1.Client, Number, Number, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a subscription',
        description: 'Get one subscription with id',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a subscription',
        description: 'Update one subscription with id',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_1.UpdateSubscriptionDto,
        client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a subscription',
        description: 'Delete one subscription with id',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.SubscriptionCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "delete", null);
SubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)('subscriptions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(api_key_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [create_subscription_service_1.CreateSubscriptionService,
        get_all_subscriptions_service_1.GetAllSubscriptionsService,
        find_subscription_service_1.FindSubscriptionService,
        update_subscription_service_1.UpdateSubscriptionService,
        cancel_subscription_service_1.CancelSubscriptionService,
        reactivate_subscription_service_1.ReactivateSubscriptionService,
        renew_subscription_service_1.RenewSubscriptionService,
        verify_credit_service_1.VerifyCreditService])
], SubscriptionsController);
exports.SubscriptionsController = SubscriptionsController;
//# sourceMappingURL=subscriptions.controller.js.map