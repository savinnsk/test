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
exports.PaymentMakeRequestDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const payer_1 = require("../payer");
class PaymentMakeRequestDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pagarme',
        description: 'Payment gateway used for transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "paymentGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 300,
        description: 'Amount of the transaction',
        type: 'number',
    }),
    __metadata("design:type", Number)
], PaymentMakeRequestDoc.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BRL',
        description: 'Currency used to pay transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Number of installments',
        type: 'number',
    }),
    __metadata("design:type", Number)
], PaymentMakeRequestDoc.prototype, "installments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Air ticket purchase',
        description: 'Description of the transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0001',
        description: 'Code of the transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://api:3000/v1/payments/callback',
        description: 'Callback url',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "callbackUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payer_1.PayerInfosDoc,
        description: 'Transactions payer',
        type: payer_1.PayerInfosDoc,
    }),
    __metadata("design:type", payer_1.PayerInfosDoc)
], PaymentMakeRequestDoc.prototype, "payer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'pix',
        description: 'Transaction payment method',
        type: 'string',
    }),
    __metadata("design:type", String)
], PaymentMakeRequestDoc.prototype, "paymentMethod", void 0);
exports.PaymentMakeRequestDoc = PaymentMakeRequestDoc;
//# sourceMappingURL=paymentMakeRequest.doc.js.map