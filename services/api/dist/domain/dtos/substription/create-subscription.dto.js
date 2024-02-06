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
exports.CreateSubscriptionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const payment_enum_1 = require("../../../app/payments/enums/payment.enum");
const payer_dto_1 = require("../payer.dto");
const credit_card_dto_1 = require("../credit-card.dto");
class CreateSubscriptionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentGateway: { required: true, enum: require("../../../app/payments/enums/payment.enum").PaymentGateway }, paymentMethod: { required: true, enum: require("../../../app/payments/enums/payment.enum").PaymentMethod }, planId: { required: true, type: () => String }, payer: { required: true, type: () => require("../payer.dto").PayerDto }, creditCard: { required: false, type: () => require("../credit-card.dto").CreditCardDto } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentGateway),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "paymentGateway", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentMethod),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "planId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => payer_dto_1.PayerDto),
    __metadata("design:type", payer_dto_1.PayerDto)
], CreateSubscriptionDto.prototype, "payer", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.paymentMethod == payment_enum_1.PaymentMethod.CreditCard),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => credit_card_dto_1.CreditCardDto),
    __metadata("design:type", credit_card_dto_1.CreditCardDto)
], CreateSubscriptionDto.prototype, "creditCard", void 0);
exports.CreateSubscriptionDto = CreateSubscriptionDto;
//# sourceMappingURL=create-subscription.dto.js.map