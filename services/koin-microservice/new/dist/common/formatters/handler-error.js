"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerError = void 0;
class HandlerError {
    static makeError(error) {
        var _a, _b, _c, _d, _e;
        const errorBody = (_a = error.body.AdditionalInfo) !== null && _a !== void 0 ? _a : [];
        return {
            status: 'failed',
            statusCode: (_c = mapperStatusCode((_b = error.body) === null || _b === void 0 ? void 0 : _b.Code)) !== null && _c !== void 0 ? _c : 500,
            message: (_e = (_d = error.body) === null || _d === void 0 ? void 0 : _d.Message) !== null && _e !== void 0 ? _e : 'Unexpected error',
            errors: [...errorBody, error.body.Message],
        };
    }
}
exports.HandlerError = HandlerError;
function mapperStatusCode(statusCode) {
    console.log('statusCode: ', statusCode, typeof statusCode);
    switch (statusCode) {
        case '988':
            return 400;
        case '312':
        case '200':
            return 200;
        default:
            return 500;
    }
}
//# sourceMappingURL=handler-error.js.map