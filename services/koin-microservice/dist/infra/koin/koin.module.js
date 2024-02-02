"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoinModule = void 0;
const http_port_1 = require("../../domain/ports/http.port");
const axios_service_1 = require("../http/axios/axios.service");
const http_module_1 = require("../http/http.module");
const common_1 = require("@nestjs/common");
const usecases_1 = require("./usecases");
let KoinModule = class KoinModule {
};
KoinModule = __decorate([
    (0, common_1.Module)({
        imports: [http_module_1.MyHttpModule],
        providers: [
            ...usecases_1.default,
            {
                provide: http_port_1.HttpClientPort,
                useClass: axios_service_1.AxiosAdapter,
            },
        ],
        exports: [...usecases_1.default],
    })
], KoinModule);
exports.KoinModule = KoinModule;
//# sourceMappingURL=koin.module.js.map