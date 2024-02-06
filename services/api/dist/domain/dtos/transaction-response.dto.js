"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class TransactionResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { transactionId: { required: false, type: () => String }, paymentGateway: { required: true, enum: require("../../app/payments/enums/payment.enum").PaymentGateway }, paymentMethod: { required: true, enum: require("../../app/payments/enums/payment.enum").PaymentMethod }, amount: { required: true, type: () => Number }, currency: { required: true, enum: require("../../app/payments/enums/payment.enum").Currency }, installments: { required: true, type: () => Number }, status: { required: false, type: () => String } };
    }
}
exports.TransactionResponseDto = TransactionResponseDto;
//# sourceMappingURL=transaction-response.dto.js.map