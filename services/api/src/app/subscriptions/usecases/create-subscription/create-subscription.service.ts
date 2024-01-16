import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

import { SubscriptionsRepository } from '@app/subscriptions/repositories/subscriptions.repository';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { SubscriptionDocument } from '@domain/entities/subscription/subscription.schema';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';
import { PlansRepository } from '@app/plans/repositories/plans.repository';

@Injectable()
export class CreateSubscriptionService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly plansRepository: PlansRepository,

    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(
    subscription: CreateSubscriptionDto,
    client: Client,
  ): Promise<SubscriptionDocument | any> {
    try {
      const { paymentGateway } = subscription;
      const plan = await this.plansRepository.find(subscription.planId);

      if (!plan) {
        return {
          status: 'failed',
          statusCode: 400,
          message: 'Bad Request',
          errors: ['Plan not found'],
        };
      }

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        paymentGateway,
      );

      const data: any = await this.send(paymentGateway, 'create-subscription', {
        data: { ...subscription, plan },
        config: currentPaymentConfig,
      });

      if (responseIsAErrorType(data)) {
        return data;
      }

      if (!data.subscriptionId) {
        throw new BadGatewayException('Error in subscription creation');
      }

      const subscriptionCreated = await this.subscriptionsRepository.create({
        ...data,
        associatedPlan: plan,
      });

      if (!subscriptionCreated) {
        throw new BadRequestException('Subscription cant be created.');
      }

      return subscriptionCreated;
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
