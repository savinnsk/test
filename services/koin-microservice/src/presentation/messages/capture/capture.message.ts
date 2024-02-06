import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { HandlerError } from '@common/formatters/handler-error';
import { OrderMapper } from '@common/mappers/order.mapper';
import { CaptureTransactionService } from '@infra/koin/usecases/billet/capture-transaction/capture-transaction.service';
import { CaptureOrderMapper } from '@common/mappers/capture.mapper';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { CaptureCardPaymentService } from '@infra/koin/usecases/card/capture-payment/capture-payment.service';
import {
  Credentials,
  CredentialsMapper,
} from '@common/mappers/credential-mapper';
import { NotificationMapper } from '@common/mappers/notification.mapper';
import { SendNotificationPaymentService } from '@infra/koin/usecases/notication/send-nofication.service';

@Controller()
export class CaptureMessage {
  constructor(
    private readonly captureTransactionService: CaptureTransactionService,
    private readonly authService: AuthService,
    private readonly captureCardPaymentCard: CaptureCardPaymentService,
    private readonly sendNotificationService: SendNotificationPaymentService,
  ) {}

  @MessagePattern('koin-capture')
  async execute(
    @Payload()
    payload: IPayload<ApiCreateAuthorizeDto & { transactionId: string }>,
  ) {
    try {
      const credentials = CredentialsMapper.getKeysValue(
        payload.config.publicKey,
      );

      if (payload.data.paymentMethod == 'billet') {
        const auth = await this.authService.execute({
          url: 'https://pre-prd-sp-api.koin.com.br/V1/TransactionService.svc/Request',
          consumerKey: credentials.publicKey,
          secretKey: payload.config.key,
        });
        console.log(
          '🚀 ~ file: capture.message.ts:29 ~ CaptureMessage ~ auth:',
          auth,
        );

        if ('errors' in auth) {
          return auth;
        }

        const formattedDataApiToKoin = CaptureOrderMapper.toKoin({
          data: payload.data as any,
        }).data;

        const order = await this.captureTransactionService.execute({
          data: formattedDataApiToKoin,
          token: auth.body.Authorization,
        });

        if (order?.body?.code && order?.body?.message) {
       
          return order
          
        }

        console.log(
          '🚀 ~ file: capture.message.ts:46 ~ CaptureMessage ~ order:',
          order,
        );

        if ('errors' in order || order.statusCode === 312) {
          return order;
        }

        const result = OrderMapper.toApi({
          data: order.body,
          dto: payload.data,
        });

        return result;
      }

      const result = await this.captureCard(payload, credentials);

      return result;
    } catch (err) {
      console.log(err);
      return err
    }
  }

  async captureCard(
    @Payload()
    payload: IPayload<ApiCreateAuthorizeDto & { transactionId: string }>,
    credentials: Credentials,
  ) {
    const captured = await this.captureCardPaymentCard.execute({
      id: payload.data.transactionId,
      token: credentials.privateKey,
    });

    if (captured?.body?.code && captured?.body?.message) {
   
      return captured
      
      };
    

    const dataNotification = NotificationMapper.success({
      data: {
        reference_id: captured.body.transaction['reference_id'],
        business_id: credentials.businessId,
        status: captured.body.status.type,
      },
    });

    await this.sendNotificationService.execute({
      id: captured.body['order_id'],
      token: credentials.privateKey,
      data: dataNotification,
    });

    const resultFormatted = OrderMapper.captureCardToKoinToApi(captured.body);

    return resultFormatted;
  }
}
