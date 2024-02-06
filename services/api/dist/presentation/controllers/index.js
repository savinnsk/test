"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth/auth.controller");
const clients_controller_1 = require("./clients/clients.controller");
const health_controller_1 = require("./health/health.controller");
const payments_controller_1 = require("./payments/payments.controller");
const plans_controller_1 = require("./plans/plans.controller");
const public_key_controller_1 = require("./public-key/public-key.controller");
const subscriptions_controller_1 = require("./subscriptions/subscriptions.controller");
const transactions_controller_1 = require("./transactions/transactions.controller");
const users_controller_1 = require("./users/users.controller");
const payment_webhook_controller_1 = require("./webhooks/payments/payment-webhook.controller");
exports.default = [
    clients_controller_1.ClientsController,
    users_controller_1.UsersController,
    health_controller_1.HealthController,
    auth_controller_1.AuthController,
    payments_controller_1.PaymentsController,
    transactions_controller_1.TransactionsController,
    payment_webhook_controller_1.PaymentWebHookController,
    plans_controller_1.PlansController,
    subscriptions_controller_1.SubscriptionsController,
    public_key_controller_1.PublicKeysController,
];
//# sourceMappingURL=index.js.map