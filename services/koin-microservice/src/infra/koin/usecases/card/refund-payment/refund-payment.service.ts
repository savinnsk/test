import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface RefundCardPaymentServiceProps {
  id: string;
  token: string;
}

@Injectable()
export class RefundCardPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id, token }: RefundCardPaymentServiceProps) {
    const authorizeTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/orders/${id}/cancel`,
        method: 'put',
      },
      `Bearer ${token}`,
    );

    if (authorizeTransaction.statusCode > 399) {
      return HandlerError.makeError(authorizeTransaction as any);
    }

    return authorizeTransaction as any;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
