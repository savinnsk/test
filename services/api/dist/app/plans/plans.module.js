"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const microservices_1 = require("@nestjs/microservices");
const plan_schema_1 = require("../../domain/entities/plan/plan.schema");
const database_module_1 = require("../../infra/database/database.module");
const usecases_1 = require("./usecases");
const transport_config_1 = require("../../common/config/transport.config");
const products_module_1 = require("../products/products.module");
let PlansModule = class PlansModule {
};
PlansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: plan_schema_1.Plan.name,
                    schema: plan_schema_1.PlanSchema,
                },
            ]),
            database_module_1.DatabaseModule,
            microservices_1.ClientsModule.registerAsync((0, transport_config_1.default)()),
            products_module_1.ProductsModule,
        ],
        providers: [...usecases_1.default],
        exports: [...usecases_1.default],
    })
], PlansModule);
exports.PlansModule = PlansModule;
//# sourceMappingURL=plans.module.js.map