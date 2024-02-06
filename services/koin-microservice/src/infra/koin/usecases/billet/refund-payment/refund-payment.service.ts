import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface RefundPaymentServiceProps {
  id: string;
}

@Injectable()
export class RefundPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id }: RefundPaymentServiceProps) {
    const orderCreated = await this.httpClient
      .request(
        {
          url: `orders/${id}/refund`,
          method: 'put',
        },
        // key,
      )
      .then((res) => res)
      .catch((error) => error);

    if (orderCreated.statusCode > 399) {
      return orderCreated;
    }

    return orderCreated;
  }
  catch(error) {
    return error;
  }
}
