"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixMock = void 0;
const crypto_1 = require("crypto");
exports.pixMock = {
    id: (0, crypto_1.randomUUID)(),
    expires_in: new Date().getTime(),
    expires_at: new Date().getTime(),
    qr_code: 'qrcode mocked',
    qr_code_url: ['qrcode mocked'],
};
//# sourceMappingURL=pix.mock.js.map