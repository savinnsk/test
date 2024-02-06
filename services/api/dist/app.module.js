"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const base_config_1 = require("./common/config/base.config");
const auth_config_1 = require("./common/config/auth.config");
const database_config_1 = require("./infra/database/database.config");
const health_module_1 = require("./app/health/health.module");
const payments_module_1 = require("./app/payments/payments.module");
const transactions_module_1 = require("./app/transactions/transactions.module");
const auth_module_1 = require("./app/auth/auth.module");
const users_module_1 = require("./app/users/users.module");
const clients_module_1 = require("./app/clients/clients.module");
const common_module_1 = require("./common/common.module");
const database_module_1 = require("./infra/database/database.module");
const presentation_module_1 = require("./presentation/presentation.module");
const products_module_1 = require("./app/products/products.module");
const plans_module_1 = require("./app/plans/plans.module");
const subscriptions_module_1 = require("./app/subscriptions/subscriptions.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, base_config_1.default, auth_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('mongoDbUri'),
                }),
                inject: [config_1.ConfigService],
            }),
            health_module_1.HealthModule,
            database_module_1.DatabaseModule,
            presentation_module_1.PresentationModule,
            payments_module_1.PaymentsModule,
            transactions_module_1.TransactionsModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            common_module_1.CommonModule,
            products_module_1.ProductsModule,
            plans_module_1.PlansModule,
            subscriptions_module_1.SubscriptionsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map