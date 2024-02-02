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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundCardPaymentService = void 0;
const handler_error_1 = require("../../../../../common/formatters/handler-error");
const http_port_1 = require("../../../../../domain/ports/http.port");
const common_1 = require("@nestjs/common");
let RefundCardPaymentService = class RefundCardPaymentService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async execute({ id, token }) {
        const authorizeTransaction = await this.httpClient.requestPayment({
            url: `payment/v1/orders/${id}/cancel`,
            method: 'put',
        }, `Bearer ${token}`);
        if (authorizeTransaction.statusCode > 399) {
            return handler_error_1.HandlerError.makeError(authorizeTransaction);
        }
        return authorizeTransaction;
    }
    catch(error) {
        return handler_error_1.HandlerError.makeError(error);
    }
};
RefundCardPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_port_1.HttpClientPort])
], RefundCardPaymentService);
exports.RefundCardPaymentService = RefundCardPaymentService;
//# sourceMappingURL=refund-payment.service.js.map