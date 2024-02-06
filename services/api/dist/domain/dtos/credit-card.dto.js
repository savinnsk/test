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
exports.CreditCardDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreditCardDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { holderName: { required: true, type: () => String }, number: { required: true, type: () => String }, expirationMonth: { required: true, type: () => Number, minimum: 1, maximum: 12 }, expirationYear: { required: true, type: () => Number, minimum: 2023 }, cvv: { required: true, type: () => String }, cardToken: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreditCardDto.prototype, "holderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditCardDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], CreditCardDto.prototype, "expirationMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Min)(2023),
    __metadata("design:type", Number)
], CreditCardDto.prototype, "expirationYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreditCardDto.prototype, "cvv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditCardDto.prototype, "cardToken", void 0);
exports.CreditCardDto = CreditCardDto;
//# sourceMappingURL=credit-card.dto.js.map