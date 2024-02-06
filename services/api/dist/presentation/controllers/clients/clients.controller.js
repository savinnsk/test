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
exports.ClientsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../app/auth/guards/jwt-auth.guard");
const create_client_service_1 = require("../../../app/clients/usecases/create-client/create-client.service");
const find_all_client_service_1 = require("../../../app/clients/usecases/find-all-client/find-all-client.service");
const find_client_by_id_service_1 = require("../../../app/clients/usecases/find-client-by-id/find-client-by-id.service");
const update_client_service_1 = require("../../../app/clients/usecases/update-client/update-client.service");
const delete_client_service_1 = require("../../../app/clients/usecases/delete-client/delete-client.service");
const update_client_by_api_key_service_1 = require("../../../app/clients/usecases/update-client-by-api-key/update-client-by-api-key.service");
const create_client_dto_1 = require("../../../domain/dtos/client/create-client.dto");
const update_client_dto_1 = require("../../../domain/dtos/client/update-client.dto");
const client_mapper_1 = require("../../mappers/client.mapper");
const docs_1 = require("../../../common/docs");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const api_key_auth_guard_1 = require("../../../app/auth/guards/api-key-auth.guard");
let ClientsController = class ClientsController {
    constructor(createClientService, updateClientService, deleteClientService, findAllClientService, findClientByIdService, updateClientByApiKeyService) {
        this.createClientService = createClientService;
        this.updateClientService = updateClientService;
        this.deleteClientService = deleteClientService;
        this.findAllClientService = findAllClientService;
        this.findClientByIdService = findClientByIdService;
        this.updateClientByApiKeyService = updateClientByApiKeyService;
    }
    async create(response, createClientDto) {
        try {
            const client = await this.createClientService.execute({
                createClientDto,
            });
            return response.status(200).send({ client });
        }
        catch (error) {
            return response.status(400).send({
                message: error.message,
            });
        }
    }
    async findAll(response, page, limit) {
        const clients = await this.findAllClientService.execute({
            page,
            limit: limit || 5,
        });
        return response.status(200).send({ clients });
    }
    async findOne(id) {
        const data = await this.findClientByIdService.execute(id);
        return client_mapper_1.ClientMapper.toJSON({ data, showApiKey: true });
    }
    async update(id, updateClientDto) {
        return await this.updateClientService.execute({ id, updateClientDto });
    }
    async updateByApiKey(updateClientDto, user) {
        return await this.updateClientByApiKeyService.execute({
            apiKey: user.apiKey,
            updateClientDto,
        });
    }
    remove(id) {
        return this.deleteClientService.execute(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new client.',
        description: 'Create a new client with name and payments config',
    }),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateClientRequestDoc,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: docs_1.ClientCreatedResponseDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all clients.',
        description: 'Get all clients with informations',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.ClientInfoDoc,
        isArray: true,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a client by id.',
        description: 'Get a client by id with informations',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.ClientInfoDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Patch a client by id.',
        description: 'Modify clients informations.',
    }),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateClientRequestDoc,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.ClientInfoDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(api_key_auth_guard_1.ApiKeyAuthGuard),
    (0, common_1.Put)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Patch a client by id.',
        description: 'Modify clients informations.',
    }),
    (0, swagger_1.ApiBody)({
        type: docs_1.CreateClientRequestDoc,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.ClientInfoDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_dto_1.UpdateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "updateByApiKey", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a client by id.',
        description: 'Delete a client by id.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "remove", null);
ClientsController = __decorate([
    (0, swagger_1.ApiTags)('clients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [create_client_service_1.CreateClientService,
        update_client_service_1.UpdateClientService,
        delete_client_service_1.DeleteClientService,
        find_all_client_service_1.FindAllClientService,
        find_client_by_id_service_1.FindClientByIdService,
        update_client_by_api_key_service_1.UpdateClientByApiKeyService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map