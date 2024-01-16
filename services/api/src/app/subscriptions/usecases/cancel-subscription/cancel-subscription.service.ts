import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { firstValueFrom } from 'rxjs';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';
import { PlansRepository } from '@app/plans/repositories/plans.repository';

interface CancelSubscriptionServiceProps {
  id: string;
  client: Client;
}

@Injectable()
export class CancelSubscriptionService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly plansRepository: PlansRepository,
    private readonly findSubscriptionService: FindSubscriptionService,

    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute({ id, client }: CancelSubscriptionServiceProps): Promise<any> {
    try {
      const subscription = await this.findSubscriptionService.execute(id, {
        throwErrors: false,
      });

      const paymentGateway =
        subscription?.paymentGateway ?? PaymentGateway.Vindi;

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        paymentGateway,
      );

      const data: any = await this.send(paymentGateway, 'cancel-subscription', {
        data: {
          id: subscription?.subscriptionId ?? id,
          existsInOrDB: !!subscription?.subscriptionId,
        },
        config: currentPaymentConfig,
      });

      if (responseIsAErrorType(data)) {
        return data;
      }

      let result = {};

      if (subscription?.subscriptionId) {
        result = await this.subscriptionsRepository.partialUpdate(
          data,
          subscription.id,
        );
      }

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getPaymentGatewayClient(paymentGateway: PaymentGateway): ClientProxy {
    return this[`${paymentGateway}Client`];
  }

  private async send(
    paymentGateway: PaymentGateway,
    action: string,
    payload: any,
  ): Promise<any> {
    return await firstValueFrom(
      this.getPaymentGatewayClient(paymentGateway).send(
        `${paymentGateway}-${action}`,
        payload,
      ),
    );
  }

  private getGatewayKey(paymentConfigs: any, getewayName: string) {
    const currentPaymentConfig = paymentConfigs.find(
      (paymentConfig) => paymentConfig.name === getewayName,
    );
    return currentPaymentConfig;
  }
}
