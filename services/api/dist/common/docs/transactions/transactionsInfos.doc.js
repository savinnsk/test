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
exports.TransactionsInfosDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const payer_1 = require("../payer");
const payments_1 = require("../payments");
class TransactionsInfosDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pagarme',
        description: 'Payment gateway used for transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "paymentGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'credit_card',
        description: 'Transaction payment method',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 300,
        description: 'Amount of the transaction',
        type: 'number',
    }),
    __metadata("design:type", Number)
], TransactionsInfosDoc.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BRL',
        description: 'Currency used to pay transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Number of installments',
        type: 'number',
    }),
    __metadata("design:type", Number)
], TransactionsInfosDoc.prototype, "installments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payer_1.PayerInfosDoc,
        description: 'Transactions payer',
        type: payer_1.PayerInfosDoc,
    }),
    __metadata("design:type", payer_1.PayerInfosDoc)
], TransactionsInfosDoc.prototype, "payer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payments_1.CreditCardInfosDoc,
        description: 'Credit card used in transaction',
        type: payments_1.CreditCardInfosDoc,
    }),
    __metadata("design:type", payments_1.CreditCardInfosDoc)
], TransactionsInfosDoc.prototype, "creditCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Air ticket purchase',
        description: 'Description of the transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payments_1.StatusLogsInfosDoc,
        description: 'Historical logs of the transaction',
        type: payments_1.StatusLogsInfosDoc,
    }),
    __metadata("design:type", payments_1.StatusLogsInfosDoc)
], TransactionsInfosDoc.prototype, "statusLog", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://api:3000/v1/payments/callback',
        description: 'Callback url',
        type: 'string',
        required: false,
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "callbackUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '63caa78d678137fd70ec905a',
        description: 'Clients id',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'authorized',
        description: 'The status of the transaction',
        type: 'string',
    }),
    __metadata("design:type", String)
], TransactionsInfosDoc.prototype, "currentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the transaction was created',
        type: Date,
    }),
    __metadata("design:type", Date)
], TransactionsInfosDoc.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the transaction was updated',
        type: Date,
    }),
    __metadata("design:type", Date)
], TransactionsInfosDoc.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Transactions version',
        type: 'number',
    }),
    __metadata("design:type", Number)
], TransactionsInfosDoc.prototype, "__v", void 0);
exports.TransactionsInfosDoc = TransactionsInfosDoc;
//# sourceMappingURL=transactionsInfos.doc.js.map