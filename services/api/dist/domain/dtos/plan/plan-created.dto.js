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
exports.PlanCreatedDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const payment_enum_1 = require("../../../app/payments/enums/payment.enum");
class PlanCreatedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, paymentGateway: { required: true, enum: require("../../../app/payments/enums/payment.enum").PaymentGateway }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, interval: { required: true, type: () => String }, intervalCount: { required: true, type: () => Number }, intervalName: { required: true, type: () => String }, billingTriggerType: { required: true, type: () => String }, billingTriggerDay: { required: true, type: () => Number }, billingCycles: { required: true, type: () => Number }, invoiceSplit: { required: true, type: () => Boolean }, metadata: { required: true, type: () => Object }, productId: { required: true, type: () => String }, planId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentGateway),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "paymentGateway", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "interval", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlanCreatedDto.prototype, "intervalCount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "intervalName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "billingTriggerType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlanCreatedDto.prototype, "billingTriggerDay", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlanCreatedDto.prototype, "billingCycles", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlanCreatedDto.prototype, "invoiceSplit", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PlanCreatedDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanCreatedDto.prototype, "planId", void 0);
exports.PlanCreatedDto = PlanCreatedDto;
//# sourceMappingURL=plan-created.dto.js.map