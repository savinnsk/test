"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let FormatResponseInterceptor = class FormatResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((returnedData) => {
            const res = context.switchToHttp().getResponse();
            const statusCode = (returnedData === null || returnedData === void 0 ? void 0 : returnedData.statusCode)
                ? returnedData.statusCode
                : res.statusCode;
            const payload = (returnedData === null || returnedData === void 0 ? void 0 : returnedData.statusCode)
                ? Object.assign(Object.assign({}, returnedData), { status: undefined, statusCode: undefined }) : returnedData;
            const status = (returnedData === null || returnedData === void 0 ? void 0 : returnedData.statusCode) ? 'REPROVED' : 'APPROVED';
            res.status(statusCode).send({
                status,
                statusCode,
                data: payload,
            });
        }));
    }
};
FormatResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], FormatResponseInterceptor);
exports.FormatResponseInterceptor = FormatResponseInterceptor;
//# sourceMappingURL=format-response.interceptor.js.map