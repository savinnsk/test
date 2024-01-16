import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

import {
  HttpRequest,
  HttpResponse,
} from '@domain/interfaces/axios-http-client.interface';
import { HttpClientPort } from '@domain/ports/http.port';

@Injectable()
export class AxiosAdapter implements HttpClientPort {
  constructor(private readonly configService: ConfigService) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    const baseURL = this.configService.get('apiUri');
    const token = this.configService.get('apiToken');

    try {
      axiosResponse = await axios.request({
        url: baseURL + data.url,
        method: data.method,
        data: data.body,
        ...(data?.params && { params: data?.params }),
        headers: { ...data?.headers, Authorization: 'Bearer ' + token },
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    switch (axiosResponse.status) {
      case 401:
        break;

      default:
        break;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
