"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewrelicInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const newrelic = require('newrelic');
let NewrelicInterceptor = class NewrelicInterceptor {
    intercept(context, next) {
        const doesEnvIsDevelopment = process.env.ENV === 'development';
        if (doesEnvIsDevelopment) {
            return next.handle();
        }
        return newrelic.startWebTransaction(context.getHandler().name, function () {
            const transaction = newrelic.getTransaction();
            return next.handle().pipe((0, operators_1.tap)(() => {
                return transaction.end();
            }));
        });
    }
};
NewrelicInterceptor = __decorate([
    (0, common_1.Injectable)()
], NewrelicInterceptor);
exports.NewrelicInterceptor = NewrelicInterceptor;
//# sourceMappingURL=new-relic.interceptor.js.map