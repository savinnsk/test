import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { firstValueFrom } from 'rxjs';
import { Client } from '@domain/entities/client/client.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';

@Injectable()
export class VerifyCreditService {
  constructor(
    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(data: CreateSubscriptionDto, client: Client): Promise<void> {
    try {
      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        data.paymentGateway,
      );

      const result: any = await this.send(
        data.paymentGateway,
        'verify-subscription',
        {
          data,
          config: currentPaymentConfig,
        },
      );

      console.log('result', result);

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
