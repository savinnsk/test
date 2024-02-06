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
exports.CreatePlanDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const products_1 = require("../products");
class CreatePlanDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'vindi',
        description: 'Payment gateway used for plan',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreatePlanDoc.prototype, "paymentGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Nome do plano',
        description: 'Here is the name of the plan',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreatePlanDoc.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Descrição do plano',
        description: 'Here is the description of the plan',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreatePlanDoc.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'months',
        description: 'The interval at which to charge (months, days)',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreatePlanDoc.prototype, "interval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The time based on the interval at which the charge should be made',
        type: 'number',
    }),
    __metadata("design:type", Number)
], CreatePlanDoc.prototype, "intervalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The valid time for a given plan.',
        type: 'number',
    }),
    __metadata("design:type", Number)
], CreatePlanDoc.prototype, "billingCycles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'day_of_month',
        description: 'Activation type for billing day setting (day_of_month, begginig_of_period, end_of_period)',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreatePlanDoc.prototype, "billingTriggerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The day that should be billed based on the billing type',
        type: 'string',
    }),
    __metadata("design:type", Number)
], CreatePlanDoc.prototype, "billingTriggerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'invoice type.',
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], CreatePlanDoc.prototype, "invoiceSplit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: products_1.CreateProductDoc,
        description: 'Product related to this plan',
    }),
    __metadata("design:type", products_1.CreateProductDoc)
], CreatePlanDoc.prototype, "product", void 0);
exports.CreatePlanDoc = CreatePlanDoc;
//# sourceMappingURL=create-plan.doc.js.map