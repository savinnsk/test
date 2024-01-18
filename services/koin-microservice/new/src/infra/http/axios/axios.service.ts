import {
  HttpRequest,
  HttpResponse,
} from '@domain/interfaces/axios-http-client.interface';
import { HttpClientPort } from '@domain/ports/http.port';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import * as https from 'https';

@Injectable()
export class AxiosAdapter implements HttpClientPort {
  constructor(private readonly configService: ConfigService) {}

  async request(data: HttpRequest, token?: string): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const baseURL = this.configService.get('apiUri');
    console.log(
      '🚀 ~ file: axios.service.ts:18 ~ AxiosAdapter ~ request ~ baseURL:',
      baseURL + data.url,
    );
    const formattedApiToken = token;

    try {
      axiosResponse = await axios.request({
        url: baseURL + data.url,
        method: data.method,
        data: data.body,
        ...(data?.params && { params: data?.params }),
        headers: {
          ...data?.headers,
          Authorization: formattedApiToken,
          'Content-Type': 'application/json',
        },
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

  async requestPayment(
    data: HttpRequest,
    token?: string,
  ): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const baseURL = process.env.NEW_KOIN_API_URL;

    if (baseURL === undefined) {
      console.warn('ENV > NEW_KOIN_API_URL > is not defined');
    }
    console.log(
      '🚀 ~ file: axios.service.ts:18 ~ AxiosAdapter ~ request ~ baseURL:',
      baseURL + data.url,
    );

    if (baseURL == undefined || baseURL == null) {
      return {
        statusCode: 500,
        body: 'PAYMENT URL UNDEFINED',
      };
    }
    const formattedApiToken = token;

    try {
      axiosResponse = await axios.request({
        url: baseURL + data.url,
        method: data.method,
        data: data.body,
        ...(data?.params && { params: data?.params }),
        headers: {
          ...data?.headers,
          Authorization: formattedApiToken,
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      console.log('ERROR>>>>>:', error.data);
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
