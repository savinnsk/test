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
exports.CaptureMessage = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const handler_error_1 = require("../../../common/formatters/handler-error");
const order_mapper_1 = require("../../../common/mappers/order.mapper");
const capture_transaction_service_1 = require("../../../infra/koin/usecases/billet/capture-transaction/capture-transaction.service");
const capture_mapper_1 = require("../../../common/mappers/capture.mapper");
const auth_service_1 = require("../../../infra/koin/usecases/billet/auth/auth.service");
const capture_payment_service_1 = require("../../../infra/koin/usecases/card/capture-payment/capture-payment.service");
const credential_mapper_1 = require("../../../common/mappers/credential-mapper");
const notification_mapper_1 = require("../../../common/mappers/notification.mapper");
const send_nofication_service_1 = require("../../../infra/koin/usecases/notication/send-nofication.service");
let CaptureMessage = class CaptureMessage {
    constructor(captureTransactionService, authService, captureCardPaymentCard, sendNotificationService) {
        this.captureTransactionService = captureTransactionService;
        this.authService = authService;
        this.captureCardPaymentCard = captureCardPaymentCard;
        this.sendNotificationService = sendNotificationService;
    }
    async execute(payload) {
        try {
            const credentials = credential_mapper_1.CredentialsMapper.getKeysValue(payload.config.publicKey);
            if (payload.data.paymentMethod == 'billet') {
                const auth = await this.authService.execute({
                    url: 'https://pre-prd-sp-api.koin.com.br/V1/TransactionService.svc/Request',
                    consumerKey: credentials.publicKey,
                    secretKey: payload.config.key,
                });
                console.log('🚀 ~ file: capture.message.ts:29 ~ CaptureMessage ~ auth:', auth);
                if ('errors' in auth) {
                    return auth;
                }
                const formattedDataApiToKoin = capture_mapper_1.CaptureOrderMapper.toKoin({
                    data: payload.data,
                }).data;
                const order = await this.captureTransactionService.execute({
                    data: formattedDataApiToKoin,
                    token: auth.body.Authorization,
                });
                if (order.body.code && order.body.message) {
                    return handler_error_1.HandlerError.makeError({
                        body: {
                            Code: order.body.code,
                            Message: order.body.message,
                        },
                    });
                }
                console.log('🚀 ~ file: capture.message.ts:46 ~ CaptureMessage ~ order:', order);
                if ('errors' in order || order.statusCode === 312) {
                    return order;
                }
                const result = order_mapper_1.OrderMapper.toApi({
                    data: order.body,
                    dto: payload.data,
                });
                return result;
            }
            const result = await this.captureCard(payload, credentials);
            return result;
        }
        catch (err) {
            console.log(err);
            return handler_error_1.HandlerError.makeError(err);
        }
    }
    async captureCard(payload, credentials) {
        const captured = await this.captureCardPaymentCard.execute({
            id: payload.data.transactionId,
            token: credentials.privateKey,
        });
        if (captured.body.code && captured.body.message) {
            return handler_error_1.HandlerError.makeError({
                body: {
                    Code: captured.body.code,
                    Message: captured.body.message,
                },
            });
        }
        const dataNotification = notification_mapper_1.NotificationMapper.success({
            data: {
                reference_id: captured.body.transaction['reference_id'],
                business_id: credentials.businessId,
                status: captured.body.status.type,
            },
        });
        await this.sendNotificationService.execute({
            id: captured.body['order_id'],
            token: credentials.privateKey,
            data: dataNotification,
        });
        const resultFormatted = order_mapper_1.OrderMapper.captureCardToKoinToApi(captured.body);
        return resultFormatted;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('koin-capture'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaptureMessage.prototype, "execute", null);
__decorate([
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaptureMessage.prototype, "captureCard", null);
CaptureMessage = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [capture_transaction_service_1.CaptureTransactionService,
        auth_service_1.AuthService,
        capture_payment_service_1.CaptureCardPaymentService,
        send_nofication_service_1.SendNotificationPaymentService])
], CaptureMessage);
exports.CaptureMessage = CaptureMessage;
//# sourceMappingURL=capture.message.js.map