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
exports.CreatePlanDto = void 0;
const openapi = require("@nestjs/swagger");
const payment_enum_1 = require("../../../app/payments/enums/payment.enum");
const class_validator_1 = require("class-validator");
const plan_dto_1 = require("./plan.dto");
class CreatePlanDto extends plan_dto_1.PlanDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentGateway: { required: true, enum: require("../../../app/payments/enums/payment.enum").PaymentGateway } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentGateway),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "paymentGateway", void 0);
exports.CreatePlanDto = CreatePlanDto;
//# sourceMappingURL=create-plan.dto.js.map