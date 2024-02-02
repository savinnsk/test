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
exports.AuthService = void 0;
const handler_error_1 = require("../../../../../common/formatters/handler-error");
const http_port_1 = require("../../../../../domain/ports/http.port");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async execute(body) {
        const response = await this.httpClient
            .request({
            url: `access/token/resource`,
            method: 'post',
            body,
        })
            .then((res) => {
            return res;
        })
            .catch((error) => {
            return error;
        });
        if (response.statusCode > 399) {
            return handler_error_1.HandlerError.makeError(response);
        }
        return response;
    }
    catch(error) {
        return handler_error_1.HandlerError.makeError(error);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_port_1.HttpClientPort])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map