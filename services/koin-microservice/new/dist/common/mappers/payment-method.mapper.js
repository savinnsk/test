"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodMapper = void 0;
class PaymentMethodMapper {
    static toPagarme({ data }) {
        let response = data;
        if (data === 'billet')
            response = 'boleto';
        return {
            data: response,
        };
    }
    static toApi({ data }) {
        let response = data;
        if (data === 'boleto')
            response = 'billet';
        return {
            data: response,
        };
    }
}
exports.PaymentMethodMapper = PaymentMethodMapper;
//# sourceMappingURL=payment-method.mapper.js.map