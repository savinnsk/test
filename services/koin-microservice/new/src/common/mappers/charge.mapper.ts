import { CreateAuthorizeDto } from 'payment-hub-types';

import {
  IOrderResponse,
  IOrderPagarmeRequest,
} from '@domain/interfaces/order.interface';

export interface IToPagarmeRequest {
  data: CreateAuthorizeDto;
}

export interface IToPagarmeResponse {
  data: IOrderPagarmeRequest;
}

export interface IToApiRequest {
  data: IOrderResponse;
}

export interface IToApiResponse {
  data: { transactionId: string; status: string };
}

export class ChargeMapper {
  static toApi({ data }: IToApiRequest): IToApiResponse {
    const response = {
      transactionId: data.id,
      status: data.status,
    };

    return { data: response };
  }
}
