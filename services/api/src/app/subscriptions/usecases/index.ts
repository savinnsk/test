import { CancelSubscriptionService } from './cancel-subscription/cancel-subscription.service';
import { CreateSubscriptionService } from './create-subscription/create-subscription.service';
import { FindSubscriptionService } from './find-subscription/find-subscription.service';
import { GetAllSubscriptionsService } from './get-all-subscriptions/get-all-subscriptions.service';
import { ReactivateSubscriptionService } from './reactivate-subscription/reactivate-subscription.service';
import { RenewSubscriptionService } from './renew-subscription/renew-subscription.service';
import { UpdateSubscriptionService } from './update-subscription/update-subscription.service';
import { VerifyCreditService } from './verify-credit/verify-credit.service';

export default [
  CreateSubscriptionService,
  VerifyCreditService,
  GetAllSubscriptionsService,
  FindSubscriptionService,
  UpdateSubscriptionService,
  CancelSubscriptionService,
  ReactivateSubscriptionService,
  RenewSubscriptionService,
];
