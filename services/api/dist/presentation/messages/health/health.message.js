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
exports.HealthMessage = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let HealthMessage = class HealthMessage {
    paymentCaptureTest(data) {
        console.log('RECEIVE(payment_capture_test): ', data);
    }
    pagarmeCaptureResponseTest(data) {
        console.log('RECEIVE(pagarme_capture_response_test): ', data);
    }
    pagseguroCaptureResponseTest(data) {
        console.log('RECEIVE(pagseguro_capture_response_test): ', data);
    }
};
__decorate([
    (0, microservices_1.EventPattern)('payment_capture_test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthMessage.prototype, "paymentCaptureTest", null);
__decorate([
    (0, microservices_1.EventPattern)('pagarme_capture_response_test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthMessage.prototype, "pagarmeCaptureResponseTest", null);
__decorate([
    (0, microservices_1.EventPattern)('pagseguro_capture_response_test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthMessage.prototype, "pagseguroCaptureResponseTest", null);
HealthMessage = __decorate([
    (0, common_1.Controller)()
], HealthMessage);
exports.HealthMessage = HealthMessage;
//# sourceMappingURL=health.message.js.map