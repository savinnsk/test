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
exports.ClientInfoDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const payments_1 = require("../payments");
class ClientInfoDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Busca milhas.',
        description: 'Client name.',
        type: 'string',
    }),
    __metadata("design:type", String)
], ClientInfoDoc.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'pph_e4788ec1-5293-4e71-ae3b-933ce7dfd93c',
        description: 'Client api key.',
        type: 'string',
    }),
    __metadata("design:type", String)
], ClientInfoDoc.prototype, "apiKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
    }),
    __metadata("design:type", payments_1.PaymentsConfigsResponseDoc)
], ClientInfoDoc.prototype, "paymentsConfigs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Client version.',
        type: 'number',
    }),
    __metadata("design:type", Number)
], ClientInfoDoc.prototype, "__v", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the client was created.',
        type: Date,
    }),
    __metadata("design:type", Date)
], ClientInfoDoc.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the client was updated.',
        type: Date,
    }),
    __metadata("design:type", Date)
], ClientInfoDoc.prototype, "updatedAt", void 0);
exports.ClientInfoDoc = ClientInfoDoc;
//# sourceMappingURL=clientInfos.doc.js.map