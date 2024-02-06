"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseIsAErrorType = void 0;
const responseIsAErrorType = (response) => {
    return (((response === null || response === void 0 ? void 0 : response.statusCode) && (response === null || response === void 0 ? void 0 : response.statusCode) > 399) ||
        (response === null || response === void 0 ? void 0 : response.status) === 'failed');
};
exports.responseIsAErrorType = responseIsAErrorType;
//# sourceMappingURL=respose-is-error-type.js.map