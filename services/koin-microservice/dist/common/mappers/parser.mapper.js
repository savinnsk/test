"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserMapper = void 0;
const status_from_webhook_enum_1 = require("../../domain/enums/status-from-webhook.enum");
const transaction_status_enum_1 = require("../../domain/enums/transaction-status.enum");
class ParserMapper {
    static toApi(payload) {
        const { codeReturn } = payload.data;
        if (codeReturn === status_from_webhook_enum_1.StatusFromWebhook.approved) {
            return transaction_status_enum_1.TransactionStatus.captured;
        }
        if (codeReturn === status_from_webhook_enum_1.StatusFromWebhook.cancelled ||
            codeReturn === status_from_webhook_enum_1.StatusFromWebhook.repproved) {
            return transaction_status_enum_1.TransactionStatus.cancelled;
        }
        if (codeReturn === status_from_webhook_enum_1.StatusFromWebhook.pending) {
            return transaction_status_enum_1.TransactionStatus.pending;
        }
        return payload.currentStatus;
    }
}
exports.ParserMapper = ParserMapper;
//# sourceMappingURL=parser.mapper.js.map