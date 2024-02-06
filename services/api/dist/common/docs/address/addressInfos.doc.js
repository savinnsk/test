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
exports.BillingAddressInfosDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
class BillingAddressInfosDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rua K',
        description: 'Payer street.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 662,
        description: 'Payer house number.',
        type: 'number',
    }),
    __metadata("design:type", Number)
], BillingAddressInfosDoc.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Zona de Expansão (Mosqueiro)',
        description: 'Payer neighborhood.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Aracaju',
        description: 'Payer city.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SE',
        description: 'Payer state.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BR',
        description: 'Payer country.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '49008-417',
        description: 'Payer zip code.',
        type: 'string',
    }),
    __metadata("design:type", String)
], BillingAddressInfosDoc.prototype, "zipCode", void 0);
exports.BillingAddressInfosDoc = BillingAddressInfosDoc;
//# sourceMappingURL=addressInfos.doc.js.map