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
exports.InstallmentOptionSchema = exports.InstallmentOption = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let InstallmentOption = class InstallmentOption {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], InstallmentOption.prototype, "incomingPercentValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], InstallmentOption.prototype, "fee", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "originalValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "valueResidueFeeTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "maxValueFee", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "paymentType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], InstallmentOption.prototype, "installments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "valueFeeTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "firstDueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], InstallmentOption.prototype, "hasIncoming", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "installmentValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InstallmentOption.prototype, "incomingValue", void 0);
InstallmentOption = __decorate([
    (0, mongoose_1.Schema)()
], InstallmentOption);
exports.InstallmentOption = InstallmentOption;
exports.InstallmentOptionSchema = mongoose_1.SchemaFactory.createForClass(InstallmentOption);
//# sourceMappingURL=installment-option.schema.js.map