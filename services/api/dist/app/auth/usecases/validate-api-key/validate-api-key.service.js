"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateApiKeyService = void 0;
const common_1 = require("@nestjs/common");
const find_client_by_api_key_service_1 = require("../../../clients/usecases/find-client-by-api-key/find-client-by-api-key.service");
let ValidateApiKeyService = class ValidateApiKeyService {
    constructor(findClientByApiKeyService) {
        this.findClientByApiKeyService = findClientByApiKeyService;
    }
    async execute(apiKey) {
        return await this.findClientByApiKeyService.execute(apiKey);
    }
};
ValidateApiKeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [find_client_by_api_key_service_1.FindClientByApiKeyService])
], ValidateApiKeyService);
exports.ValidateApiKeyService = ValidateApiKeyService;
//# sourceMappingURL=validate-api-key.service.js.map