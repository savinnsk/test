"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationModule = void 0;
const common_1 = require("@nestjs/common");
const koin_module_1 = require("../infra/koin/koin.module");
const http_port_1 = require("../domain/ports/http.port");
const axios_service_1 = require("../infra/http/axios/axios.service");
const http_module_1 = require("../infra/http/http.module");
const messages_1 = require("./messages");
const controllers_1 = require("./controllers");
const health_module_1 = require("../app/health/health.module");
let PresentationModule = class PresentationModule {
};
PresentationModule = __decorate([
    (0, common_1.Module)({
        imports: [koin_module_1.KoinModule, http_module_1.MyHttpModule, health_module_1.HealthModule],
        controllers: [...messages_1.default, ...controllers_1.default],
        providers: [
            {
                provide: http_port_1.HttpClientPort,
                useClass: axios_service_1.AxiosAdapter,
            },
        ],
    })
], PresentationModule);
exports.PresentationModule = PresentationModule;
//# sourceMappingURL=presentation.module.js.map