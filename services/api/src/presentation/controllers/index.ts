import { AuthController } from './auth/auth.controller';
import { ClientsController } from './clients/clients.controller';
import { HealthController } from './health/health.controller';
import { PaymentsController } from './payments/payments.controller';
import { PlansController } from './plans/plans.controller';
import { PublicKeysController } from './public-key/public-key.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { UsersController } from './users/users.controller';
import { PaymentWebHookController } from './webhooks/payments/payment-webhook.controller';

export default [
  ClientsController,
  UsersController,
  HealthController,
  AuthController,
  PaymentsController,
  TransactionsController,
  PaymentWebHookController,
  PlansController,
  SubscriptionsController,
  PublicKeysController,
];
