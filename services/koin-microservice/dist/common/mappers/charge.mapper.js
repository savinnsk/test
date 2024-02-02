"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeMapper = void 0;
class ChargeMapper {
    static toApi({ data }) {
        const response = {
            transactionId: data.id,
            status: data.status,
        };
        return { data: response };
    }
}
exports.ChargeMapper = ChargeMapper;
//# sourceMappingURL=charge.mapper.js.map