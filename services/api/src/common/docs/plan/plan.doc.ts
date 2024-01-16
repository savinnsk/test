import { ApiProperty } from '@nestjs/swagger';

export class PlanDoc {
  @ApiProperty({
    example: 'vindi',
    description: 'Payment gateway used for plan',
    type: 'string',
  })
  paymentGateway: string;

  @ApiProperty({
    example: 'Nome do plano',
    description: 'Here is the name of the plan',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'Descrição do plano',
    description: 'Here is the description of the plan',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    example: 'months',
    description: 'The interval at which to charge (months, days)',
    type: 'string',
  })
  interval: string;

  @ApiProperty({
    example: 1,
    description:
      'The time based on the interval at which the charge should be made',
    type: 'number',
  })
  intervalCount: number;

  @ApiProperty({
    example: 1,
    description: 'The valid time for a given plan.',
    type: 'number',
  })
  billingCycles: number;

  @ApiProperty({
    example: 'day_of_month',
    description:
      'Activation type for billing day setting (day_of_month, begginig_of_period, end_of_period)',
    type: 'string',
  })
  billingTriggerType: string;

  @ApiProperty({
    example: 10,
    description: 'The day that should be billed based on the billing type',
    type: 'string',
  })
  billingTriggerDay: number;

  @ApiProperty({
    example: true,
    description: 'invoice type.',
    type: 'boolean',
  })
  invoiceSplit: boolean;

  @ApiProperty({
    example: '2022-07-10T20:58:35.053Z',
    description: 'Date when the plan was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-10T20:58:35.053Z',
    description: 'Date when the plan was updated',
    type: Date,
  })
  updatedAt: Date;
}
