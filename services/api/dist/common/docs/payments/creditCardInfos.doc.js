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
exports.CreditCardInfosDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreditCardInfosDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Alexandre Vinicius Nogueira',
        description: 'Credit card holder name',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreditCardInfosDoc.prototype, "holderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4235647728025682',
        description: 'Credit card number',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreditCardInfosDoc.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Credit card expiration month',
        type: 'number',
    }),
    __metadata("design:type", Number)
], CreditCardInfosDoc.prototype, "expirationMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2023,
        description: 'Credit card expiration year',
        type: 'number',
    }),
    __metadata("design:type", Number)
], CreditCardInfosDoc.prototype, "expirationYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123',
        description: 'Credit card cvv',
        type: 'string',
    }),
    __metadata("design:type", String)
], CreditCardInfosDoc.prototype, "cvv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'UKQmKwJXq8E6svZ3cw5aPEZQPGJ0waxbX68gFFL3xhhTwuOqC3/Mj0oI+Q0KpN7N0gDenymD85WoW7SWO3+JrZIbGMCuFQum9VhbYduesGHaCm9KbGh9HdCSM3PbTSLjhSruvz4ijt0sSjARp38rfNtluQzCIx1P+X7L50zQ1jzUe983tu6VG9uDFe/2CnNoEaXV4MFjW+I78DXsrFmXM5k9/JYy2d492XLYWq/N0r71ZhSCBFinP25XycZdEtGZcfRxJhAdbNIvPtpqLln5O3811cYcvkBg0kF94y+u9iU2PpA61kmpcM4gvpM84Kiz94uPEDz22+E2gu2fsnVZ9Q==',
        description: 'Credit card encrypted token',
        type: 'string',
        required: false,
    }),
    __metadata("design:type", String)
], CreditCardInfosDoc.prototype, "cardToken", void 0);
exports.CreditCardInfosDoc = CreditCardInfosDoc;
//# sourceMappingURL=creditCardInfos.doc.js.map