export interface IToPagarmeRequest {
  data: string;
}

export interface IToPagarmeResponse {
  data: string;
}

export interface IToApiRequest {
  data: string;
}

export interface IToApiResponse {
  data: string;
}

export class PaymentMethodMapper {
  static toPagarme({ data }: IToPagarmeRequest): IToPagarmeResponse {
    let response = data;

    if (data === 'billet') response = 'boleto';

    return {
      data: response,
    };
  }

  static toApi({ data }: IToApiRequest): IToApiResponse {
    let response = data;

    if (data === 'boleto') response = 'billet';

    return {
      data: response,
    };
  }
}
