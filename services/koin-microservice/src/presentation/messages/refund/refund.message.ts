import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { HandlerError } from '@common/formatters/handler-error';

import { RefundCardPaymentService } from '@infra/koin/usecases/card/refund-payment/refund-payment.service';
import { CredentialsMapper } from '@common/mappers/credential-mapper';
import { NotificationMapper } from '@common/mappers/notification.mapper';
import { SendNotificationPaymentService } from '@infra/koin/usecases/notication/send-nofication.service';

@Controller()
export class RefundMessage {
  constructor(
    private readonly refundCardPaymentService: RefundCardPaymentService,
    private readonly sendNotificationService: SendNotificationPaymentService,
  ) {}

  @MessagePattern('koin-refund')
  async execute(
    @Payload()
    payload: IPayload<ApiCreateAuthorizeDto & { transactionId: string ,metadata : {antifraud_ref_id : string} }>,
  ) {
    try {
      const credentials = CredentialsMapper.getKeysValue(
        payload.config.publicKey,
      );

      const result = await this.refundCardPaymentService.execute({
        id: payload.data.transactionId,
        token: credentials.privateKey,
      });

      if (result.body.code && result.body.message) {
        return HandlerError.makeError({
          body: {
            Code: result.body.code,
            Message: result.body.message,
          },
        });
      }


      await this.sendNotificationService.execute({
        id: payload.data.metadata.antifraud_ref_id,
        token: credentials.privateKey,
        data: NotificationMapper.canceled(),
      });

      return { data: { tansaction_id: result.body.order_id } };
    } catch (err) {
      console.log(err);
      return HandlerError.makeError(err);
    }
  }
}
