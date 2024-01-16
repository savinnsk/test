import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface TokenizeCardPaymentServiceProps {
  data: any;
  token: string;
}

@Injectable()
export class TokenizeCardPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ data, token }: TokenizeCardPaymentServiceProps) {
    const authorizeTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/tokenize`,
        method: 'post',
        body: data,
      },
      `Bearer ${token}`,
    );

    if (authorizeTransaction.statusCode > 399) {
      return HandlerError.makeError(authorizeTransaction as any);
    }

    return authorizeTransaction;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
