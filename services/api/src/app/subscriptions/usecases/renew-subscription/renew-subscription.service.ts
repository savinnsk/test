import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { firstValueFrom } from 'rxjs';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';

@Injectable()
export class RenewSubscriptionService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly findSubscriptionService: FindSubscriptionService,

    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(id: string, client: Client): Promise<void> {
    try {
      const { paymentGateway, subscriptionId } =
        await this.findSubscriptionService.execute(id);

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        paymentGateway,
      );

      const data: any = await this.send(paymentGateway, 'renew-subscription', {
        data: { id: subscriptionId },
        config: currentPaymentConfig,
      });

      if (responseIsAErrorType(data)) {
        return data;
      }

      const result = await this.subscriptionsRepository.partialUpdate(data, id);

      return result;
    } catch (error) {
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
