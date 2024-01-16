import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { Client } from '@domain/entities/client/client.schema';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetPublicKeysService {
  constructor(
    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
  ) {}

  async execute(query: any, client: Client): Promise<any> {
    const [paymentsConfigs, paymentGateway] = [
      client.paymentsConfigs,
      query.payment_gateway,
    ];

    const gatewayKey = this.getGatewayKey(paymentsConfigs, paymentGateway);

    const publicKeyResponse = await this.send(
      paymentGateway,
      'get-public-key',
      {
        data: {
          authorization: gatewayKey.key,
        },
      },
    );

    return publicKeyResponse;
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

  private getPaymentGatewayClient(paymentGateway: PaymentGateway): ClientProxy {
    return this[`${paymentGateway}Client`];
  }

  private getGatewayKey(paymentConfigs: any, getewayName: string) {
    const currentPaymentConfig = paymentConfigs.find(
      (paymentConfig) => paymentConfig.name === getewayName,
    );
    return currentPaymentConfig;
  }
}
