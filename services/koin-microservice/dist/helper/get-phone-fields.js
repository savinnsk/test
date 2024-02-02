"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhoneFields = void 0;
const getPhoneFields = (phone) => {
    var _a;
    const regex = /\d/g;
    const phoneFormatted = (_a = phone.match(regex)) === null || _a === void 0 ? void 0 : _a.join('');
    if (phoneFormatted && phoneFormatted.length >= 12) {
        const CountryCode = phoneFormatted.slice(0, 2);
        const AreaCode = phoneFormatted.slice(2, 4);
        const Number = phoneFormatted.slice(4);
        return {
            CountryCode,
            AreaCode,
            Number,
        };
    }
    return null;
};
exports.getPhoneFields = getPhoneFields;
//# sourceMappingURL=get-phone-fields.js.map