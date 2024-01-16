import {
  HttpRequest,
  HttpResponse,
} from '@domain/interfaces/axios-http-client.interface';

export abstract class HttpClientPort<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}
