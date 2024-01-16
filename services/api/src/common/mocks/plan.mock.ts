import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { TriggerType } from '@domain/enums/billing-trigger-type.enum';
import { IntervalType } from '@domain/enums/intervalType.enum';

export const planMock = {
  paymentGateway: PaymentGateway.Vindi,
  name: 'Plano de assinatura',
  description: 'Plano de assinatura teste',
  interval: IntervalType.months,
  intervalCount: 1,
  billingTriggerType: TriggerType.day,
  billingTriggerDay: 10,
  billingCycles: 2,
  invoiceSplit: false,
  product: {
    name: 'Produto de assinatura',
    price: 10,
  },
};
