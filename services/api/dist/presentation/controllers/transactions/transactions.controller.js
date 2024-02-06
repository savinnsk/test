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
exports.TransactionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../app/auth/guards/jwt-auth.guard");
const find_all_transactions_service_1 = require("../../../app/transactions/usecases/find-all-transactions/find-all-transactions.service");
const find_transaction_by_id_service_1 = require("../../../app/transactions/usecases/find-transaction-by-id/find-transaction-by-id.service");
const docs_1 = require("../../../common/docs");
const find_transactions_by_client__service_1 = require("../../../app/transactions/usecases/find-transactions-by-client/find-transactions-by-client-.service");
let TransactionsController = class TransactionsController {
    constructor(findAllTransactionsService, findTransactionByIdService, findTransactionsByClientService) {
        this.findAllTransactionsService = findAllTransactionsService;
        this.findTransactionByIdService = findTransactionByIdService;
        this.findTransactionsByClientService = findTransactionsByClientService;
    }
    async findAll(response, page, limit) {
        const transactions = await this.findAllTransactionsService.execute({
            page,
            limit: limit || 5,
        });
        return response.status(200).send({ transactions });
    }
    findOne(id) {
        return this.findTransactionByIdService.execute(id);
    }
    findByClient(client) {
        return this.findTransactionsByClientService.execute(client);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all transactions',
        description: 'Get all transactions with all infos',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.TransactionsInfosDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get one transaction by id',
        description: 'Get one transaction by id with all infos',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.TransactionsInfosDoc,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/client/:client'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get transactions by client',
        description: 'Get all transactions associated with a specific client',
    }),
    (0, swagger_1.ApiResponse)({
        type: docs_1.TransactionsInfosDoc,
        isArray: true,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
    __param(0, (0, common_1.Param)('client')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findByClient", null);
TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [find_all_transactions_service_1.FindAllTransactionsService,
        find_transaction_by_id_service_1.FindTransactionByIdService,
        find_transactions_by_client__service_1.FindTransactionsByClientService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map