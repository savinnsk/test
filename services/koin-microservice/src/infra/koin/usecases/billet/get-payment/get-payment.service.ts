import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface GetPaymentServiceProps {
  id: string;
}

@Injectable()
export class GetPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ id }: GetPaymentServiceProps) {
    const orderCreated = await this.httpClient
      .request(
        {
          url: `orders/${id}`,
          method: 'get',
        },
        // key,
      )
      .then((res) => res)
      .catch((error) => error);

    if (orderCreated.statusCode > 399) {
      return HandlerError.makeError(orderCreated);
    }

    return orderCreated;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
