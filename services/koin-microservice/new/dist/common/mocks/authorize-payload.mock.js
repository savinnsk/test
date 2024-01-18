"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: { key: 'KEY_MOCKED', publicKey: 'PUBLIC_KEY_MOCKED' },
    data: {
        paymentGateway: 'pagarme',
        amount: 105,
        installments: 1,
        currency: 'BRL',
        description: 'Descricao do produto',
        code: '0001',
        callbackUrl: 'https://webhook.site/cd81f5bd-6cd3-4d21-bc42-a77b35ad9dca',
        payer: {
            firstName: 'Wandeson',
            lastName: 'Da silva',
            email: 'wilson.wandeson@in8.com.br',
            phone: '+238 123-12-34',
            document: 'QC013145',
            documentType: 'PASSPORT',
            dateOfBirth: '1994-02-28',
            billingAddress: {
                street: 'Malibu Point',
                number: 222,
                neighborhood: 'Malibu Central',
                city: 'Malibu',
                state: 'CA',
                country: 'US',
                zipCode: '90265',
                complement: 'Teste de complemente com muitos caracteres',
            },
        },
        paymentMethod: 'billet',
        transactionId: 'ID_FALSY',
    },
};
//# sourceMappingURL=authorize-payload.mock.js.map