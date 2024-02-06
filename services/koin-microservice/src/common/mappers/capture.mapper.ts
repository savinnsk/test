import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { getPhoneFields } from '../../helper/get-phone-fields';
import { generateFraudId } from '../../helper/get-fraud-id';

export interface IToKoinRequest {
  data: ApiCreateAuthorizeDto & {
    _id: string;
    transactionId: string;
    callbackUrl: string;
    fraudId: string;
    payer: { ip: string };
    installmentId: string;
  };
}

export interface IToKoinResponse {
  data: any;
}

export interface IToApiRequest {
  data: any;
  dto: ApiCreateAuthorizeDto;
}

export interface IToApiResponse {
  data: any;
}

export class CaptureOrderMapper {
  static toKoin({ data }: IToKoinRequest): IToKoinResponse {
    // TODO: refatorar esta lógica
    // const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    // const phoneCodes = data.payer.phone.split(' ');
    // const [, areaCode, numberPhone] = phoneCodes.map((code) =>
    //   code.match(NUMERIC_REGEXP),
    // );

    const phoneObject = getPhoneFields(data.payer.phone);

    const address = {
      AddressType: '1',
      City: data.payer.billingAddress.city,
      Country: data.payer.billingAddress.country,
      Number: String(data.payer.billingAddress.number),
      State: data.payer.billingAddress.state,
      Street: data.payer.billingAddress.street,
      ZipCode: data.payer.billingAddress.zipCode,
    };

    const currentDate = new Date();
    const now = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const documentWithoutAccents = data.payer.document.replace(
      /[\u0300-\u036f]/g,
      '',
    );

    const fraudId = generateFraudId();

    return {
      data: {
        AdditionalInfo: {
          Key: 'BirthDay',
          Value: data.payer.dateOfBirth,
        },
        AdditionalParameters: {
          CallbackUrl: data.callbackUrl,
          OrderOriginData: {
            OrderOriginCompanyName: 'Nome da loja',
            OrderOriginDocuments: {
              Key: 'CNPJ',
              Value: '32.778.350/0001-70',
            },
            OrderOriginIsDifferent: 'Y',
          },
          SalesChannelId: '3',
        },
        Buyer: {
          AdditionalInfo: [
            {
              Key: 'BirthDay',
              Value: data.payer.dateOfBirth,
            },
          ],
          Address: address,
          Documents: [
            {
              Key: data.payer.documentType,
              Value: documentWithoutAccents,
            },
          ],
          Email: data.payer.email,
          Ip: '189.124.123.152',
          Name: data.payer.firstName,
          Phones: [
            {
              AreaCode: phoneObject.AreaCode,
              Number: phoneObject.Number,
              PhoneType: '4',
            },
          ],
        },
        Currency: data.currency,
        FraudId: fraudId,
        Items: [
          {
            Category: 'IN8',
            Description: 'IN8 Payment Transaction',
            Price: data.amount,
            Quantity: '1',
            Reference: data._id,
          },
        ],
        OrderOriginCompanyName: 'IN8 Payments Hub',
        OrderOriginData: {
          Key: 'CNPJ',
          Value: '32.778.350/0001-70',
        },
        PaymentType: data.transactionId,
        Price: data.amount,
        Reference: data._id,
        Shipping: {
          Address: address,
          DeliveryDate: now,
          Price: '0.00',
        },
      },
    };
  }

  static toApi({ data, dto }: IToApiRequest): IToApiResponse {
    const response = {
      ...dto,
      status: data.status,
      installmentOptions: data?.installmentOptions?.map((option) => ({
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
