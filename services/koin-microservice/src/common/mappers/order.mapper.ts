import {
  CreateAuthorizeDto as ApiCreateAuthorizeDto,
  CreditCardModel,
} from 'payment-hub-types';
import { CreateAuthorizeDto } from '@domain/dtos/authorize-charge/create-authorize.dto';
import {
  CaptureKoinResponse,
  CreatePaymentDto,
  CreditCardToKoinPayload,
} from '@domain/dtos/create-payment/create-payment-dto';
import { v4 } from 'uuid';
import { Credentials } from './credential-mapper';
import { getPhoneFields } from '../../helper/get-phone-fields';
export interface IToKoinRequest {
  data: ApiCreateAuthorizeDto & {
    transactionId: string;
  };
}

export interface IToKoinResponse {
  data: CreateAuthorizeDto;
}

export interface IToApiRequest {
  data: any;
  dto: ApiCreateAuthorizeDto;
}

export interface IToApiResponse {
  data: any;
}

export interface ICardKoinRequest {
  data: ApiCreateAuthorizeDto & {
    transactionId: string;
  } & {
    callbackUrl: string;
  } & {
    koinCreditCardToken: string;
  } & {
    metadata: {
      sessionId: string;
      ip: string;
      antifraud_ref_id: string;
    };
  };
  credentials: Credentials;
}

export interface ICardKoinResponse {
  data: CreatePaymentDto;
}

export class OrderMapper {
  static billetToKoin({ data }: IToKoinRequest): IToKoinResponse {
    return {
      data: {
        Cpf: data.payer.document,
        Email: data.payer.email,
        TotalPrice: String(data.amount),
        Ip: '17740347',
        Optin: 'true',
        SalesChannelId: '00',
        MaxInstallments: '12',
        AdditionalData: {
          CarRentalData: {
            metadata: Object.create(data),
          },
        },
      },
    };
  }

  static cardToKoin({
    data,
    credentials,
  }: ICardKoinRequest): ICardKoinResponse {
    const { AreaCode, Number } = getPhoneFields(data.payer.phone);
    return {
      data: {
        store: {
          code: credentials.iss,
        },
        transaction: {
          amount: {
            currency_code: data.currency,
            value: data.amount,
          },
          reference_id: data.metadata?.antifraud_ref_id,
          account: credentials.account_number,
        },
        payment_method: {
          code: 'CARD',
          secure_token: data.koinCreditCardToken,
          installments: data.installments,
        },
        payer: {
          full_name: data.payer.firstName + ' ' + data.payer.lastName,
          email: data.payer.email,
          document: {
            type: data.payer.documentType.toLowerCase(),
            number: data.payer.document,
          },
        },
        country_code: data.payer.billingAddress.country,
        notification_url: [data.callbackUrl],
        buyer: {
          document: {
            number: data.payer.document,
            nationality: data.payer.billingAddress.country,
            type: data.payer.documentType.toUpperCase(),
          },
          phone: {
            area_code: AreaCode,
            number: Number,
            type: 'Mobile',
          },
          id: v4(),
          first_name: data.payer.firstName,
          last_name: data.payer.lastName,
          full_name: data.payer.firstName + ' ' + data.payer.lastName,
          email: data.payer.email,
          birth_date: data.payer.dateOfBirth,
        },
        session_id: data.metadata?.sessionId
          ? data.metadata?.sessionId
          : '5b8c20c3-45de-41bf-b243-87ad5d21bc3b',
        ip_address: data.metadata?.ip ? data.metadata?.ip : '127.0.0.1',
        items: [
          {
            price: {
              currency_code: data.currency,
              value: data.amount,
            },
            category: {
              name: data.code,
              id: v4(),
            },
            type: 'Generic',
            id: v4(),
            name: 'Generic Item',
            quantity: 1,
          },
        ],
      },
    };
  }

  static tokenizeCard(
    dataCard: CreditCardModel,
    referenceId: string,
  ): CreditCardToKoinPayload {
    return {
      transaction: {
        reference_id: referenceId,
      },
      card: {
        number: dataCard.number,
        expiration_month: dataCard.expirationMonth.toString(),
        expiration_year: dataCard.expirationYear.toString(),
        security_code: dataCard.cvv.toString(),
        holder_name: dataCard.holderName,
      },
    };
  }

  static captureCardToKoinToApi(data: CaptureKoinResponse): IToApiResponse {
    return {
      data: {
        transactionId: data.order_id,
      },
    };
  }
  static toApi({ data, dto }: IToApiRequest): IToApiResponse {
    if (data.order_id) {
      Object.assign(data, {
        transactionId: data.order_id,
      });
      return { data: data };
    }
    const response = {
      ...dto,
      status: data.status,
      installmentOptions: data.installmentOptions.map((option) => ({
        incomingPercentValue: option.incomingPercentValue,
        fee: option.feeKoin,
        description: option.description,
        originalValue: option.originalValue,
        valueResidueFeeTotal: option.valueResidueFeeKoinTotal,
        orderValue: option.orderValue,
        maxValueFee: option.maxValueFeeKoin,
        paymentType: option.paymentType,
        installments: option.installments,
        valueFeeTotal: option.valueFeeKoinTotal,
        firstDueDate: option.firstDueDate,
        hasIncoming: option.hasIncoming,
        installmentValue: option.installmentValue,
        incomingValue: option.incomingValue,
      })),
      transactionId: data.code,
    };

    return { data: response };
  }
}
