import { ApiProperty } from '@nestjs/swagger';

import { CreateSubscriptionDoc } from './create-subscription.doc';

export class SubscriptionCreatedDoc extends CreateSubscriptionDoc {
  @ApiProperty({
    example: '123456543',
    description: 'Subscription id in microservice',
    type: 'string',
  })
  subscriptionId: string;

  @ApiProperty({
    example: '2022-07-05T20:58:35.053Z',
    description: 'Date when the subscription was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-05T20:58:35.053Z',
    description: 'Date when the subscription was updated',
    type: Date,
  })
  updatedAt: Date;
}
