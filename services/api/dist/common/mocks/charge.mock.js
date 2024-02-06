"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    paymentGateway: 'paypal',
    amount: 100.76,
    currency: 'BRL',
    installments: 1,
    payer: {
        firstName: 'Gustavo',
        lastName: 'Candioto',
        email: 'candioto@in8.com.br',
        phone: '+55 (31) 986611580',
        cpf: '11050897625',
        dateOfBirth: '1994-02-28',
        billingAddress: {
            street: 'Rua Expedicionário Antônio Nascimento',
            number: 162,
            neighborhood: 'Palmares',
            city: 'Belo Horizonte',
            state: 'MG',
            country: 'BR',
            zipCode: '31155-450',
        },
    },
    paymentMethod: 'credit_card',
    creditCard: {
        holderName: 'GUSTAVO C CANDIOTO',
        number: '5200485810909069',
        expirationMonth: 1,
        expirationYear: 2030,
        cvv: '000',
    },
};
//# sourceMappingURL=charge.mock.js.map