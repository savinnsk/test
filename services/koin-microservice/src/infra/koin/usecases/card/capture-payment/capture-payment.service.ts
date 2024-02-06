import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface CaptureCardPaymentServiceProps {
  id: string;
  token: string;
}

@Injectable()
export class CaptureCardPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id, token }: CaptureCardPaymentServiceProps) {
    const authorizeTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/orders/${id}/capture`,
        method: 'post',
      },
      `Bearer ${token}`,
    );

    console.log("CaptureCardPaymentService",JSON.stringify(authorizeTransaction, null,2));
    if (authorizeTransaction.statusCode > 399) {
      return authorizeTransaction ;
    }

    return authorizeTransaction as any;
  }
  catch(error) {
    return error;
  }
}
