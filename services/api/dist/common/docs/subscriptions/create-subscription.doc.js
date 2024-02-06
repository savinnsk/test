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
exports.CreateSubscriptionDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const payer_1 = require("../payer");
const payments_1 = require("../payments");
class CreateSubscriptionDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'vindi',
        description: 'Gateway used to create a subscription.',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreateSubscriptionDoc.prototype, "paymentGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'credit_card',
        description: 'Payment method for subscription.',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreateSubscriptionDoc.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1233456',
        description: 'Plans id for subscription',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreateSubscriptionDoc.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payer_1.PayerInfosDoc,
        description: 'Payer whos subscribe',
        type: payer_1.PayerInfosDoc,
    }),
    __metadata("design:type", payer_1.PayerInfosDoc)
], CreateSubscriptionDoc.prototype, "payer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payments_1.CreditCardInfosDoc,
        description: 'Credit card informations',
        type: payments_1.CreditCardInfosDoc,
    }),
    __metadata("design:type", payments_1.CreditCardInfosDoc)
], CreateSubscriptionDoc.prototype, "creditCard", void 0);
exports.CreateSubscriptionDoc = CreateSubscriptionDoc;
//# sourceMappingURL=create-subscription.doc.js.map