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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../app/auth/guards/jwt-auth.guard");
const create_user_service_1 = require("../../../app/users/usecases/create-user/create-user.service");
const find_all_users_service_1 = require("../../../app/users/usecases/find-all-users/find-all-users.service");
const find_user_by_id_service_1 = require("../../../app/users/usecases/find-user-by-id/find-user-by-id.service");
const create_user_dto_1 = require("../../../domain/dtos/user/create-user.dto");
const docs_1 = require("../../../common/docs");
let UsersController = class UsersController {
    constructor(createUserService, findAllUsersService, findUserByIdService) {
        this.createUserService = createUserService;
        this.findAllUsersService = findAllUsersService;
        this.findUserByIdService = findUserByIdService;
    }
    async create(createUserDto) {
        return await this.createUserService.execute(createUserDto);
    }
    async findAll(response, page, limit) {
        const users = await this.findAllUsersService.execute({
            page,
            limit: limit || 5,
        });
        return response.status(200).send({ users });
    }
    async findOne(id) {
        return await this.findUserByIdService.execute(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new user.',
        description: 'Create a new user with name, email and password.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: docs_1.UserCreatedDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users.',
        description: 'Get all users with all informations.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.UserCreatedDoc,
        isArray: true,
    }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get an user by id.',
        description: 'Get an user by id with all informations.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: docs_1.UserCreatedDoc,
    }),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_service_1.CreateUserService,
        find_all_users_service_1.FindAllUsersService,
        find_user_by_id_service_1.FindUserByIdService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map