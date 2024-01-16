import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindSubscriptionService } from '../find-subscription/find-subscription.service';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';

@Injectable()
export class UpdateSubscriptionService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly findSubscriptionService: FindSubscriptionService,

    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(
    updateSubscriptionDto: UpdateSubscriptionDto,
    id: string,
    client: Client,
  ): Promise<SubscriptionDocument> {
    try {
      const subscription = await this.findSubscriptionService.execute(id);

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        subscription.paymentGateway,
      );

      const data = await this.send(
        subscription.paymentGateway,
        'update-subscription',
        {
          data: {
            ...updateSubscriptionDto,
            payer: {
              ...updateSubscriptionDto.payer,
              customerId: subscription.payer.customerId,
            },
            subscriptionId: subscription.subscriptionId,
            paymentProfileId: subscription.paymentProfileId,
          },
          config: currentPaymentConfig,
        },
      );

      if (responseIsAErrorType(data)) {
        return data;
      }

      const subscriptionUpdated = await this.subscriptionsRepository.update(
        data,
        id,
      );

      if (!subscriptionUpdated) {
        throw new BadRequestException('Subscription cant be updated.');
      }

      return subscriptionUpdated;
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
