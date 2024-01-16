import { IsString } from 'class-validator';

import { CreateSubscriptionDto } from './create-subscription.dto';

export class SubscriptionCreatedDto extends CreateSubscriptionDto {
  @IsString()
  id: string;

  @IsString()
  subscriptionId: string;
}
