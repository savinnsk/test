"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsMapper = void 0;
class CredentialsMapper {
    static getKeysValue(credentials) {
        const keyValuePairs = credentials.split(',');
        const keyValueObject = {};
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            keyValueObject[key] = value;
        });
        return keyValueObject;
    }
}
exports.CredentialsMapper = CredentialsMapper;
//# sourceMappingURL=credential-mapper.js.map