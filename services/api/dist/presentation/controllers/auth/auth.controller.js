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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../app/auth/guards/jwt-auth.guard");
const local_auth_guard_1 = require("../../../app/auth/guards/local-auth.guard");
const login_service_1 = require("../../../app/auth/usecases/login/login.service");
const docs_1 = require("../../../common/docs");
let AuthController = class AuthController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async login(req) {
        return this.loginService.execute({ user: req.user });
    }
    getProfile(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Credentials to login',
        description: 'Use your credentials to login and get access token',
    }),
    (0, swagger_1.ApiBody)({
        type: docs_1.LoginRequestDoc,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successful authentication',
        type: docs_1.LoginResponseDoc,
    }),
    (0, common_1.Post)('/login'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get your profile infos',
        description: 'Use your token to get some of your informations',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: docs_1.MeResponseDoc,
    }),
    (0, common_1.Get)('/me'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map