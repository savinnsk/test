"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = require("./login/login.service");
const validate_api_key_service_1 = require("./validate-api-key/validate-api-key.service");
const validate_user_service_1 = require("./validate-user/validate-user.service");
exports.default = [login_service_1.LoginService, validate_api_key_service_1.ValidateApiKeyService, validate_user_service_1.ValidateUserService];
//# sourceMappingURL=index.js.map