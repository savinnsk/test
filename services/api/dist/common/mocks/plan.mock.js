"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planMock = void 0;
const payment_enum_1 = require("../../app/payments/enums/payment.enum");
const billing_trigger_type_enum_1 = require("../../domain/enums/billing-trigger-type.enum");
const intervalType_enum_1 = require("../../domain/enums/intervalType.enum");
exports.planMock = {
    paymentGateway: payment_enum_1.PaymentGateway.Vindi,
    name: 'Plano de assinatura',
    description: 'Plano de assinatura teste',
    interval: intervalType_enum_1.IntervalType.months,
    intervalCount: 1,
    billingTriggerType: billing_trigger_type_enum_1.TriggerType.day,
    billingTriggerDay: 10,
    billingCycles: 2,
    invoiceSplit: false,
    product: {
        name: 'Produto de assinatura',
        price: 10,
    },
};
//# sourceMappingURL=plan.mock.js.map