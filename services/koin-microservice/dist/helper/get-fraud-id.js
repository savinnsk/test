"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFraudId = void 0;
function genCode() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function generateFraudId() {
    let fraudId = '';
    for (let i = 0; i < 8; i++) {
        fraudId += genCode();
    }
    return fraudId;
}
exports.generateFraudId = generateFraudId;
//# sourceMappingURL=get-fraud-id.js.map