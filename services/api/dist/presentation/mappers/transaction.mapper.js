"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMapper = void 0;
class TransactionMapper {
    static toJSON(transaction) {
        console.log(transaction);
        return {
            transactionId: transaction.transactionId,
            paymentGateway: transaction.paymentGateway,
            paymentMethod: transaction.paymentMethod,
            amount: transaction.amount,
            currency: transaction.currency,
            installments: transaction.installments,
            status: transaction.currentStatus,
        };
    }
}
exports.TransactionMapper = TransactionMapper;
//# sourceMappingURL=transaction.mapper.js.map