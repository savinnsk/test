import { HandlerError } from '@common/formatters/handler-error';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';

interface AuthServiceProps {
  url: string;
  consumerKey: string;
  secretKey: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClientPort) {}
  async execute(body: AuthServiceProps) {
    const response = await this.httpClient
      .request({
        url: `access/token/resource`,
        method: 'post',
        body,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });

    if (response.statusCode > 399) {
      return HandlerError.makeError(response);
    }

    return response;
  }
  catch(error) {
    return HandlerError.makeError(error);
  }
}
