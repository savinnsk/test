import { HandlerError } from '@common/formatters/handler-error';
import { CreatePaymentDto } from '@domain/dtos/create-payment/create-payment-dto';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';
interface CreateCardPaymentServiceProps {
  data: CreatePaymentDto;
  token: string;
}

@Injectable()
export class CreateCardPaymentService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ data, token }: CreateCardPaymentServiceProps) {
    const authorizeTransaction = await this.httpClient.requestPayment(
      {
        url: `payment/v1/orders`,
        method: 'post',
        body: data,
      },
      `Bearer ${token}`,
    );

    console.log("CreateCardPaymentService",JSON.stringify(authorizeTransaction, null,2));
    if (authorizeTransaction.statusCode > 399) {
      return authorizeTransaction;
    }

    return authorizeTransaction;
  }
  catch(error) {
    return error;
  }
}
