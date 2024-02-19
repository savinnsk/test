export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  responseType?: any;
  params?: object | string;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

// eslint-disable-next-line no-shadow
export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  unprocessableEntity = 422,
  serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
  data?: T;
};
