"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeysModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const transport_config_1 = require("../../common/config/transport.config");
const axios_1 = require("@nestjs/axios");
const usecases_1 = require("./usecases");
let PublicKeysModule = class PublicKeysModule {
};
PublicKeysModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.registerAsync((0, transport_config_1.default)()), axios_1.HttpModule],
        providers: [...usecases_1.default],
        exports: [...usecases_1.default],
    })
], PublicKeysModule);
exports.PublicKeysModule = PublicKeysModule;
//# sourceMappingURL=public-keys.module.js.map