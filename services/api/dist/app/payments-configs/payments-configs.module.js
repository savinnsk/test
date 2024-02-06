"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const usecases_1 = require("./usecases");
const payment_config_1 = require("../../domain/entities/payment-config/payment-config");
const database_module_1 = require("../../infra/database/database.module");
let PaymentsConfigsModule = class PaymentsConfigsModule {
};
PaymentsConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: payment_config_1.PaymentConfig.name, schema: payment_config_1.PaymentConfigSchema },
            ]),
            database_module_1.DatabaseModule,
        ],
        providers: [...usecases_1.default],
        exports: [...usecases_1.default],
    })
], PaymentsConfigsModule);
exports.PaymentsConfigsModule = PaymentsConfigsModule;
//# sourceMappingURL=payments-configs.module.js.map