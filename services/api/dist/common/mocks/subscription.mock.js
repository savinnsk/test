"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionMock = void 0;
const payment_enum_1 = require("../../app/payments/enums/payment.enum");
exports.subscriptionMock = {
    paymentGateway: payment_enum_1.PaymentGateway.Vindi,
    paymentMethod: payment_enum_1.PaymentMethod.CreditCard,
    planId: '64147284c6b99023dad83844',
    payer: {
        firstName: 'Cauê Filipe',
        lastName: 'César dos Santos',
        email: 'cauefilipedossantos@gtx.ag',
        phone: '+55 (48) 2773-9807',
        document: '98512980508',
        documentType: 'CPF',
        dateOfBirth: '1994-02-28',
        billingAddress: {
            street: 'Rua Diogo Cardoso Feuser',
            number: 222,
            neighborhood: 'Imperatriz',
            city: 'Criciúma',
            state: 'SC',
            country: 'BR',
            zipCode: '88805-813',
        },
    },
    creditCard: {
        holderName: 'WILSON F SILVA',
        number: '4000000000000010',
        expirationMonth: 11,
        expirationYear: 2030,
        cvv: '123',
    },
};
//# sourceMappingURL=subscription.mock.js.map