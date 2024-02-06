"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billetMock = void 0;
const crypto_1 = require("crypto");
exports.billetMock = {
    id: (0, crypto_1.randomUUID)(),
    barcode: 'asdasdasdasd',
    instructions: 'Instructions mocked',
    due_at: '20-04-2023',
    interest: {
        days: 2,
        type: 'type',
        amount: 3,
    },
    fine: {
        days: 2,
        type: 'type',
        amount: 3,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
//# sourceMappingURL=billet.mock.js.map