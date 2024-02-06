"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdPaymentsConfigsMock = exports.createPaymentsConfigsMock = void 0;
const crypto_1 = require("crypto");
exports.createPaymentsConfigsMock = {
    name: 'pagarme',
    key: 'asdasdasdasd',
};
exports.createdPaymentsConfigsMock = {
    id: (0, crypto_1.randomUUID)(),
    name: 'pagarme',
    key: 'asdasdasdasd',
    createdAt: new Date(),
    updatedAt: new Date(),
};
//# sourceMappingURL=payments-config.mock.js.map