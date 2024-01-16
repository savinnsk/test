import { HandlerError } from '@common/formatters/handler-error';
import { CreateAuthorizeDto } from '@domain/dtos/authorize-charge/create-authorize.dto';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface AuthorizeTransactionServiceProps {
  data: CreateAuthorizeDto;
  token: string;
}

@Injectable()
export class AuthorizeTransactionService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async execute({ data, token }: AuthorizeTransactionServiceProps) {
    const authorizeTransaction = await this.httpClient.request(
      {
        url: `Transaction/authorization`,
        method: 'post',
        body: data,
      },
      token,
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
