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
declare const _default: (typeof AuthController | typeof ClientsController | typeof HealthController | typeof PaymentsController | typeof PlansController | typeof PublicKeysController | typeof SubscriptionsController | typeof TransactionsController | typeof UsersController | typeof PaymentWebHookController)[];
export default _default;
