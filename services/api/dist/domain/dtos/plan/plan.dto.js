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
exports.PlanDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const billing_trigger_type_enum_1 = require("../../enums/billing-trigger-type.enum");
const intervalType_enum_1 = require("../../enums/intervalType.enum");
const create_product_dto_1 = require("../product/create-product.dto");
class PlanDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, interval: { required: true, enum: require("../../enums/intervalType.enum").IntervalType }, intervalCount: { required: true, type: () => Number }, billingCycles: { required: true, type: () => Number }, billingTriggerType: { required: true, enum: require("../../enums/billing-trigger-type.enum").TriggerType }, billingTriggerDay: { required: true, type: () => Number }, invoiceSplit: { required: true, type: () => Boolean }, metadata: { required: false, type: () => Object }, product: { required: true, type: () => require("../product/create-product.dto").CreateProductDto }, productId: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(intervalType_enum_1.IntervalType),
    __metadata("design:type", String)
], PlanDto.prototype, "interval", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlanDto.prototype, "intervalCount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PlanDto.prototype, "billingCycles", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(billing_trigger_type_enum_1.TriggerType),
    __metadata("design:type", String)
], PlanDto.prototype, "billingTriggerType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlanDto.prototype, "billingTriggerDay", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlanDto.prototype, "invoiceSplit", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PlanDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_product_dto_1.CreateProductDto),
    __metadata("design:type", create_product_dto_1.CreateProductDto)
], PlanDto.prototype, "product", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanDto.prototype, "productId", void 0);
exports.PlanDto = PlanDto;
//# sourceMappingURL=plan.dto.js.map