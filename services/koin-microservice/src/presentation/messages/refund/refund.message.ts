import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { HandlerError } from '@common/formatters/handler-error';

import { RefundCardPaymentService } from '@infra/koin/usecases/card/refund-payment/refund-payment.service';
import { CredentialsMapper } from '@common/mappers/credential-mapper';

@Controller()
export class RefundMessage {
  constructor(
    private readonly refundCardPaymentService: RefundCardPaymentService,
  ) {}

  @MessagePattern('koin-refund')
  async execute(
    @Payload()
    payload: IPayload<ApiCreateAuthorizeDto & { transactionId: string }>,
  ) {
    try {
      const credentials = CredentialsMapper.getKeysValue(
        payload.config.publicKey,
      );

      const result = await this.refundCardPaymentService.execute({
        id: payload.data.transactionId,
        token: credentials.privateKey,
      });

      return { data: { tansaction_id: result.body.order_id } };
    } catch (err) {
      console.log(err);
      return HandlerError.makeError(err);
    }
  }
}
