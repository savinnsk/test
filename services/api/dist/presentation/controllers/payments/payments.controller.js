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
exports.PaymentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_key_auth_guard_1 = require("../../../app/auth/guards/api-key-auth.guard");
const authorize_dto_1 = require("../../../domain/dtos/authorize.dto");
const capture_dto_1 = require("../../../domain/dtos/capture.dto");
const payments_service_1 = require("../../../app/payments/payments.service");
const payment_enum_1 = require("../../../app/payments/enums/payment.enum");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const client_schema_1 = require("../../../domain/entities/client/client.schema");
const docs_1 = require("../../../common/docs");
const refund_dto_1 = require("../../../domain/dtos/refund.dto");
const format_if_billet_pipe_1 = require("../../../common/pipes/format-if-billet.pipe");
const paymentMakeRequest_doc_1 = require("../../../common/docs/payments/paymentMakeRequest.doc");
const capture_installment_dto_1 = require("../../../domain/dtos/capture-installment.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async client(paymentGateway) {
        return await this.paymentsService.client(paymentGateway);
    }
    async getInstallments() {
        return await this.paymentsService.getInstallments();
    }
    async authorize(authorizeDto, user) {
        try {
            const result = await this.paymentsService.authorize(authorizeDto, user);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async capture(captureDto, user) {
        const transaction = await this.paymentsService.capture(captureDto, user);
        return transaction;
    }
    async captureInstallment(captureInstallmentDto, id, user) {
        const transaction = await this.paymentsService.captureInstallment(Object.assign(Object.assign({}, captureInstallmentDto), { id }), user);
        return transaction;
    }
    async refund(refundDto, user) {
        const transaction = await this.paymentsService.refund(refundDto, user);
        return transaction;
    }
    async make(authorizeDto, user, response) {
        const transaction = (await this.paymentsService.make(authorizeDto, user));
        if (transaction.statusCode > 399) {
            return transaction;
        }
        return transaction.data;
    }
    async get(id, user) {
        const transaction = await this.paymentsService.get(id, user);
        return transaction;
    }
};
__decorate([
    (0, common_1.Get)('/client'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('payment-gateway')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "client", null);
__decorate([
    (0, common_1.Get)('/installments'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getInstallments", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: docs_1.PaymentAuthorizeRequestDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created transaction and integrated to gateway',
        type: docs_1.TransactionsInfosDoc,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Transaction not found for capturing',
    }),
    (0, common_1.Post)('/authorize'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)(format_if_billet_pipe_1.FormatIfBilletPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_dto_1.AuthorizeDto,
        client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "authorize", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully captured transaction on payment gateway',
        type: docs_1.TransactionsInfosDoc,
    }),
    (0, common_1.Post)('/capture'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [capture_dto_1.CaptureDto, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "capture", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully captured transaction on payment gateway',
        type: docs_1.TransactionsInfosDoc,
    }),
    (0, common_1.Post)('/capture/installment/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [capture_installment_dto_1.CaptureInstallmentDto, String, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "captureInstallment", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully refund transaction on payment gateway',
        type: docs_1.TransactionsInfosDoc,
    }),
    (0, common_1.Delete)('/refund'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_dto_1.RefundDto, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "refund", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: paymentMakeRequest_doc_1.PaymentMakeRequestDoc,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully created transaction and integrated to gateway',
        type: docs_1.TransactionsInfosDoc,
    }),
    (0, common_1.Post)('/make'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../../../domain/dtos/transaction-response.dto").TransactionResponseDto }),
    __param(0, (0, common_1.Body)(format_if_billet_pipe_1.FormatIfBilletPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_dto_1.AuthorizeDto,
        client_schema_1.Client, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "make", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_schema_1.Client]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "get", null);
PaymentsController = __decorate([
    (0, common_1.UseGuards)(api_key_auth_guard_1.ApiKeyAuthGuard),
    (0, swagger_1.ApiTags)('payments'),
    (0, swagger_1.ApiSecurity)('API key authentication'),
    (0, common_1.Controller)('payments'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'API key is missing or invalid',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation failed',
    }),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map