"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const microservices_1 = require("@nestjs/microservices");
const user_schema_1 = require("../../domain/entities/user/user.schema");
const transaction_schema_1 = require("../../domain/entities/transaction/transaction.schema");
const client_schema_1 = require("../../domain/entities/client/client.schema");
const users_repository_1 = require("../../app/users/repositories/users.repository");
const clients_repository_1 = require("../../app/clients/repositories/clients.repository");
const transactions_repository_1 = require("../../app/transactions/repositories/transactions.repository");
const users_repository_2 = require("./mongo/repositories/users.repository");
const clients_repository_2 = require("./mongo/repositories/clients.repository");
const transactions_repository_2 = require("./mongo/repositories/transactions.repository");
const payments_configs_repository_1 = require("./mongo/repositories/payments-configs.repository");
const payments_configs_repository_2 = require("../../app/payments-configs/repositories/payments-configs.repository");
const payment_config_1 = require("../../domain/entities/payment-config/payment-config");
const product_schema_1 = require("../../domain/entities/product/product.schema");
const products_repository_1 = require("../../app/products/repositories/products.repository");
const product_repository_1 = require("./mongo/repositories/product.repository");
const plan_schema_1 = require("../../domain/entities/plan/plan.schema");
const plans_repository_1 = require("../../app/plans/repositories/plans.repository");
const plans_repository_2 = require("./mongo/repositories/plans.repository");
const subscriptions_repository_1 = require("../../app/subscriptions/repositories/subscriptions.repository");
const subscriptions_repository_2 = require("./mongo/repositories/subscriptions.repository");
const subscription_schema_1 = require("../../domain/entities/subscription/subscription.schema");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema },
                { name: payment_config_1.PaymentConfig.name, schema: payment_config_1.PaymentConfigSchema },
                { name: microservices_1.Client.name, schema: client_schema_1.ClientSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: plan_schema_1.Plan.name, schema: plan_schema_1.PlanSchema },
                { name: subscription_schema_1.Subscription.name, schema: subscription_schema_1.SubscriptionSchema },
            ]),
        ],
        providers: [
            {
                provide: users_repository_1.UsersRepository,
                useClass: users_repository_2.MongoUsersRepository,
            },
            {
                provide: payments_configs_repository_2.PaymentsConfigsRepository,
                useClass: payments_configs_repository_1.MongoPaymentsConfigsRepository,
            },
            {
                provide: clients_repository_1.ClientsRepository,
                useClass: clients_repository_2.MongoClientsRepository,
            },
            {
                provide: transactions_repository_1.TransactionsRepository,
                useClass: transactions_repository_2.MongoTransactionsRepository,
            },
            {
                provide: products_repository_1.ProductsRepository,
                useClass: product_repository_1.MongoProductsRepository,
            },
            {
                provide: plans_repository_1.PlansRepository,
                useClass: plans_repository_2.MongoPlansRepository,
            },
            {
                provide: subscriptions_repository_1.SubscriptionsRepository,
                useClass: subscriptions_repository_2.MongoSubscriptionsRepository,
            },
        ],
        exports: [
            users_repository_1.UsersRepository,
            payments_configs_repository_2.PaymentsConfigsRepository,
            clients_repository_1.ClientsRepository,
            transactions_repository_1.TransactionsRepository,
            products_repository_1.ProductsRepository,
            plans_repository_1.PlansRepository,
            subscriptions_repository_1.SubscriptionsRepository,
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map