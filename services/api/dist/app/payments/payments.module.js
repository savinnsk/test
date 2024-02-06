"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const transactions_module_1 = require("../transactions/transactions.module");
const payments_service_1 = require("./payments.service");
const transport_config_1 = require("../../common/config/transport.config");
const currency_quote_module_1 = require("../../infra/currency-quotes/currency-quote.module");
const currency_quotes_port_1 = require("../../domain/ports/currency-quotes.port");
const awesomeapi_service_1 = require("../../infra/currency-quotes/awesomeapi/awesomeapi.service");
const axios_1 = require("@nestjs/axios");
const products_module_1 = require("../products/products.module");
const plans_module_1 = require("../plans/plans.module");
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            transactions_module_1.TransactionsModule,
            microservices_1.ClientsModule.registerAsync((0, transport_config_1.default)()),
            currency_quote_module_1.CurrencyQuotesModule,
            axios_1.HttpModule,
            products_module_1.ProductsModule,
            plans_module_1.PlansModule,
        ],
        providers: [
            payments_service_1.PaymentsService,
            {
                provide: currency_quotes_port_1.CurrencyQuotesPort,
                useClass: awesomeapi_service_1.AwesomeapiAdapter,
            },
        ],
        exports: [payments_service_1.PaymentsService],
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map