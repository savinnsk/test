"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdClient = exports.createClientMock = void 0;
const mongoose_1 = require("mongoose");
exports.createClientMock = {
    name: 'Busca Milhas',
    apiKey: 'asdasdasdasdasdasdasd',
    paymentsConfigs: [
        {
            name: 'pagarme',
            key: 'pagarme-fake-key',
        },
    ],
};
exports.createdClient = Object.assign(Object.assign({}, exports.createClientMock), { apiKey: 'asdasd', id: new mongoose_1.default.Types.ObjectId(), createdAt: new Date(), updatedAt: new Date() });
//# sourceMappingURL=clients.mock.js.map