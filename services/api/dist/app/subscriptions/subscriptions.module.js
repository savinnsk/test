"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const transport_config_1 = require("../../common/config/transport.config");
const subscription_schema_1 = require("../../domain/entities/subscription/subscription.schema");
const database_module_1 = require("../../infra/database/database.module");
const usecases_1 = require("./usecases");
let SubscriptionsModule = class SubscriptionsModule {
};
SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: subscription_schema_1.Subscription.name,
                    schema: subscription_schema_1.SubscriptionSchema,
                },
            ]),
            database_module_1.DatabaseModule,
            microservices_1.ClientsModule.registerAsync((0, transport_config_1.default)()),
        ],
        providers: [...usecases_1.default],
        exports: [...usecases_1.default],
    })
], SubscriptionsModule);
exports.SubscriptionsModule = SubscriptionsModule;
//# sourceMappingURL=subscriptions.module.js.map