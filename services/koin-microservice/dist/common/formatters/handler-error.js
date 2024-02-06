"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerError = void 0;
class HandlerError {
    static makeError(error) {
        var _a, _b, _c, _d, _e, _f;
        const errorBody = (_b = (_a = error.body) === null || _a === void 0 ? void 0 : _a.AdditionalInfo) !== null && _b !== void 0 ? _b : [];
        return {
            status: 'failed',
            statusCode: (_d = mapperStatusCode((_c = error.body) === null || _c === void 0 ? void 0 : _c.Code)) !== null && _d !== void 0 ? _d : 500,
            message: (_f = (_e = error.body) === null || _e === void 0 ? void 0 : _e.Message) !== null && _f !== void 0 ? _f : 'Unexpected error',
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