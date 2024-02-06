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
const users_module_1 = require("../app/users/users.module");
const clients_module_1 = require("../app/clients/clients.module");
const health_module_1 = require("../app/health/health.module");
const auth_module_1 = require("../app/auth/auth.module");
const controllers_1 = require("./controllers");
const payments_module_1 = require("../app/payments/payments.module");
const transactions_module_1 = require("../app/transactions/transactions.module");
const axios_1 = require("@nestjs/axios");
const messages_1 = require("./messages");
const microservices_1 = require("@nestjs/microservices");
const transport_config_1 = require("../common/config/transport.config");
const currency_quotes_port_1 = require("../domain/ports/currency-quotes.port");
const awesomeapi_service_1 = require("../infra/currency-quotes/awesomeapi/awesomeapi.service");
const products_module_1 = require("../app/products/products.module");
const plans_module_1 = require("../app/plans/plans.module");
const subscriptions_module_1 = require("../app/subscriptions/subscriptions.module");
const public_keys_module_1 = require("../app/public-keys/public-keys.module");
let PresentationModule = class PresentationModule {
};
PresentationModule = __decorate([
    (0, common_1.Module)({
        controllers: [...controllers_1.default, ...messages_1.default],
        imports: [
            payments_module_1.PaymentsModule,
            clients_module_1.ClientsModule,
            users_module_1.UsersModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            axios_1.HttpModule,
            transactions_module_1.TransactionsModule,
            products_module_1.ProductsModule,
            plans_module_1.PlansModule,
            subscriptions_module_1.SubscriptionsModule,
            public_keys_module_1.PublicKeysModule,
            microservices_1.ClientsModule.registerAsync((0, transport_config_1.default)()),
        ],
        providers: [
            {
                provide: currency_quotes_port_1.CurrencyQuotesPort,
                useClass: awesomeapi_service_1.AwesomeapiAdapter,
            },
        ],
    })
], PresentationModule);
exports.PresentationModule = PresentationModule;
//# sourceMappingURL=presentation.module.js.map