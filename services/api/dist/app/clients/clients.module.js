"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_schema_1 = require("../../domain/entities/client/client.schema");
const usecases_1 = require("./usecases");
const database_module_1 = require("../../infra/database/database.module");
const payments_configs_module_1 = require("../payments-configs/payments-configs.module");
const payment_config_1 = require("../../domain/entities/payment-config/payment-config");
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: client_schema_1.Client.name, schema: client_schema_1.ClientSchema },
                { name: payment_config_1.PaymentConfig.name, schema: payment_config_1.PaymentConfigSchema },
            ]),
            database_module_1.DatabaseModule,
            payments_configs_module_1.PaymentsConfigsModule,
        ],
        providers: [...usecases_1.default],
        exports: [...usecases_1.default],
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;
//# sourceMappingURL=clients.module.js.map