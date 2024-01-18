import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface SendNotificationPaymentServiceProps {
  id: string;
  token: string;
  data: any;
}

@Injectable()
export class SendNotificationPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id, token, data }: SendNotificationPaymentServiceProps) {
    const notificationTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/orders/${id}/notifications`,
        method: 'post',
        body: data,
      },
      `Bearer ${token}`,
    );
    console.log(JSON.stringify(notificationTransaction));

    return notificationTransaction as any;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
