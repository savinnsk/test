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
exports.TransactionSchema = exports.Transaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const payment_enum_1 = require("../../../app/payments/enums/payment.enum");
const billet_schema_1 = require("../billet/billet.schema");
const client_schema_1 = require("../client/client.schema");
const credit_card_schema_1 = require("../credit-card/credit-card.schema");
const payer_schema_1 = require("../payer/payer.schema");
const pix_schema_1 = require("../pix/pix.schema");
const exchange_schema_1 = require("../exchange/exchange.schema");
let Transaction = class Transaction {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "paymentGateway", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transaction.prototype, "installments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Transaction.prototype, "installmentOptions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", payer_schema_1.Payer)
], Transaction.prototype, "payer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", exchange_schema_1.Exchange)
], Transaction.prototype, "exchange", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", credit_card_schema_1.CreditCard)
], Transaction.prototype, "creditCard", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", billet_schema_1.Billet)
], Transaction.prototype, "billet", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", pix_schema_1.Pix)
], Transaction.prototype, "pix", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "transactionId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "currentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Transaction.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Transaction.prototype, "statusLog", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "callbackUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: client_schema_1.Client.name,
    }),
    (0, class_transformer_1.Type)(() => client_schema_1.Client),
    __metadata("design:type", client_schema_1.Client)
], Transaction.prototype, "client", void 0);
Transaction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Transaction);
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
//# sourceMappingURL=transaction.schema.js.map