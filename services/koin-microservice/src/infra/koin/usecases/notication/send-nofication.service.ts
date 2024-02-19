import { HandlerError } from '@common/formatters/handler-error';
import { Notification } from '@common/mappers/notification.mapper';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface SendNotificationPaymentServiceProps {
  id: string;
  token: string;
  data: Notification ;
}

@Injectable()
export class SendNotificationPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id, token, data }: SendNotificationPaymentServiceProps) {
    const notificationTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/notifications/${id}?field=REFERENCE_ID`,
        method: 'patch',
        body: data,
      },
      `Bearer ${token}`,
    );
    console.log(`NOTIFICATION OF ${data.sub_type} at ${data.notification_date} to ref antifraude ${id}`);

    return notificationTransaction as any;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
