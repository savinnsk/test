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
exports.PublicKeysController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_key_auth_guard_1 = require("../../../app/auth/guards/api-key-auth.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const client_schema_1 = require("../../../domain/entities/client/client.schema");
const get_public_key_query_dto_1 = require("../../../domain/dtos/get-public-key-query.dto");
const get_public_keys_service_1 = require("../../../app/public-keys/usecases/get-public-keys.service");
let PublicKeysController = class PublicKeysController {
    constructor(getPublicKeysService) {
        this.getPublicKeysService = getPublicKeysService;
    }
    async createPlan(query, user, response) {
        const result = await this.getPublicKeysService.execute(query, user);
        return response.status(200).send(result);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_public_key_query_dto_1.PublicKeyQueryDto,
        client_schema_1.Client, Object]),
    __metadata("design:returntype", Promise)
], PublicKeysController.prototype, "createPlan", null);
PublicKeysController = __decorate([
    (0, swagger_1.ApiTags)('public-keys'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(api_key_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Controller)('public-keys'),
    __metadata("design:paramtypes", [get_public_keys_service_1.GetPublicKeysService])
], PublicKeysController);
exports.PublicKeysController = PublicKeysController;
//# sourceMappingURL=public-key.controller.js.map