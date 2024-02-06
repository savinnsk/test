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
exports.AuthorizeDto = void 0;
const openapi = require("@nestjs/swagger");
const payment_enum_1 = require("../../app/payments/enums/payment.enum");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const address_dto_1 = require("./address.dto");
const billet_dto_1 = require("./billet.dto");
const credit_card_dto_1 = require("./credit-card.dto");
const flight_dto_1 = require("./flight.dto");
const item_dto_1 = require("./item.dto");
const payer_dto_1 = require("./payer.dto");
let AuthorizeDto = class AuthorizeDto {
    constructor() {
        this.currency = payment_enum_1.Currency.BRL;
        this.installments = 1;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentGateway: { required: true, enum: require("../../app/payments/enums/payment.enum").PaymentGateway }, amount: { required: true, type: () => Number, minimum: 1 }, currency: { required: true, default: payment_enum_1.Currency.BRL, enum: require("../../app/payments/enums/payment.enum").Currency }, installments: { required: true, type: () => Object, default: 1, minimum: 1, maximum: 12 }, payer: { required: false, type: () => require("./payer.dto").PayerDto }, items: { required: false, type: () => [require("./item.dto").ItemDto] }, flights: { required: false, type: () => [require("./flight.dto").FlightDto] }, paymentMethod: { required: true, enum: require("../../app/payments/enums/payment.enum").PaymentMethod }, expiresIn: { required: false, type: () => Number }, creditCard: { required: false, type: () => require("./credit-card.dto").CreditCardDto }, billet: { required: false, type: () => require("./billet.dto").BilletDto }, pixQr: { required: false, type: () => String }, description: { required: false, type: () => String }, code: { required: false, type: () => String }, callbackUrl: { required: false, type: () => String }, metadata: { required: false, type: () => ({ sessionId: { required: false, type: () => String }, ip: { required: false, type: () => String }, antifraud_ref_id: { required: false, type: () => String } }) } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        enum: payment_enum_1.PaymentGateway,
    }),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentGateway),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "paymentGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AuthorizeDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: payment_enum_1.Currency.BRL,
        enum: payment_enum_1.Currency,
    }),
    (0, class_validator_1.IsEnum)(payment_enum_1.Currency),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 1,
        minimum: 1,
        maximum: 12,
    }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Object)
], AuthorizeDto.prototype, "installments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => payer_dto_1.PayerDto),
    __metadata("design:type", payer_dto_1.PayerDto)
], AuthorizeDto.prototype, "payer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => item_dto_1.ItemDto),
    __metadata("design:type", Array)
], AuthorizeDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => flight_dto_1.FlightDto),
    __metadata("design:type", Array)
], AuthorizeDto.prototype, "flights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: payment_enum_1.PaymentMethod,
    }),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentMethod),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: payment_enum_1.PaymentMethod,
    }),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthorizeDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)((o) => o.paymentMethod == payment_enum_1.PaymentMethod.CreditCard),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => credit_card_dto_1.CreditCardDto),
    __metadata("design:type", credit_card_dto_1.CreditCardDto)
], AuthorizeDto.prototype, "creditCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)((o) => o.paymentMethod == payment_enum_1.PaymentMethod.Billet),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => billet_dto_1.BilletDto),
    __metadata("design:type", billet_dto_1.BilletDto)
], AuthorizeDto.prototype, "billet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)((o) => o.paymentMethod == payment_enum_1.PaymentMethod.Pix),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "pixQr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorizeDto.prototype, "callbackUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AuthorizeDto.prototype, "metadata", void 0);
AuthorizeDto = __decorate([
    (0, swagger_1.ApiExtraModels)(address_dto_1.AddressDto, credit_card_dto_1.CreditCardDto, payer_dto_1.PayerDto, item_dto_1.ItemDto, flight_dto_1.FlightDto)
], AuthorizeDto);
exports.AuthorizeDto = AuthorizeDto;
//# sourceMappingURL=authorize.dto.js.map