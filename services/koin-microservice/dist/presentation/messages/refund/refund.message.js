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
exports.RefundMessage = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const refund_payment_service_1 = require("../../../infra/koin/usecases/card/refund-payment/refund-payment.service");
const credential_mapper_1 = require("../../../common/mappers/credential-mapper");
const notification_mapper_1 = require("../../../common/mappers/notification.mapper");
const send_nofication_service_1 = require("../../../infra/koin/usecases/notication/send-nofication.service");
let RefundMessage = class RefundMessage {
    constructor(refundCardPaymentService, sendNotificationService) {
        this.refundCardPaymentService = refundCardPaymentService;
        this.sendNotificationService = sendNotificationService;
    }
    async execute(payload) {
        try {
            const credentials = credential_mapper_1.CredentialsMapper.getKeysValue(payload.config.publicKey);
            const result = await this.refundCardPaymentService.execute({
                id: payload.data.transactionId,
                token: credentials.privateKey,
            });
            if (result.body.code && result.body.message) {
                return result;
            }
            const dataNotification = notification_mapper_1.NotificationMapper.canceled({
                data: {
                    reference_id: result.body.transaction['reference_id'],
                    business_id: credentials.businessId,
                    status: result.body.status.type,
                },
            });
            await this.sendNotificationService.execute({
                id: result.body['order_id'],
                token: credentials.privateKey,
                data: dataNotification,
            });
            return { data: { tansaction_id: result.body.order_id } };
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('koin-refund'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RefundMessage.prototype, "execute", null);
RefundMessage = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [refund_payment_service_1.RefundCardPaymentService,
        send_nofication_service_1.SendNotificationPaymentService])
], RefundMessage);
exports.RefundMessage = RefundMessage;
//# sourceMappingURL=refund.message.js.map