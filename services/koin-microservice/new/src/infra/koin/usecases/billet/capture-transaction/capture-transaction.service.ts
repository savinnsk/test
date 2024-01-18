import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface CaptureTransactionServiceProps {
  token: string;
  data: any;
}

@Injectable()
export class CaptureTransactionService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ token, data }: CaptureTransactionServiceProps) {
    const orderCreated = await this.httpClient
      .request(
        {
          url: `V1/TransactionService.svc/Request`,
          method: 'post',
          body: data,
        },
        token,
      )
      .then((res) => res)
      .catch((error) => error);

    if (+orderCreated.body.Code > 299) {
      return +orderCreated.body.Code === 312
        ? {
            status: 'approved',
            statusCode: 312,
            data: {
              transactionId: orderCreated.body.IdTransaction,
              message: orderCreated.body.Message,
              statusKoin: 312,
            },
          }
        : HandlerError.makeError(orderCreated);
    }

    return orderCreated;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
