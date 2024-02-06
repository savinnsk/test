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
exports.BilletDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const billetInterest_dto_1 = require("./billetInterest.dto");
class BilletDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { barcode: { required: true, type: () => String }, instructions: { required: true, type: () => String }, due_at: { required: true, type: () => String }, interest: { required: true, type: () => require("./billetInterest.dto").BilletInterestDto }, fine: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BilletDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BilletDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BilletDto.prototype, "due_at", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", billetInterest_dto_1.BilletInterestDto)
], BilletDto.prototype, "interest", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BilletDto.prototype, "fine", void 0);
exports.BilletDto = BilletDto;
//# sourceMappingURL=billet.dto.js.map