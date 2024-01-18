export default {
  AdditionalInfo: { Key: 'BirthDay', Value: '1994-02-28' },
  AdditionalParameters: {
    CallbackUrl: 'https://webhook.site/768bfdb6-faa7-43f8-b113-6ebd7a84b456',
    OrderOriginData: {
      OrderOriginCompanyName: 'Nome da loja',
      OrderOriginDocuments: { Key: 'CNPJ', Value: '32.778.350/0001-70' },
      OrderOriginIsDifferent: 'Y',
    },
    SalesChannelId: '3',
  },
  Buyer: {
    AdditionalInfo: [{ Key: 'BirthDay', Value: '1994-02-28' }],
    Address: {
      AddressType: '1',
      City: 'Criciúma',
      Country: 'BRA',
      Number: '222',
      State: 'SC',
      Street: 'Rua Diogo Cardoso Feuser',
      ZipCode: '88805-813',
    },
    Documents: [{ Key: 'CPF', Value: '182.028.137-00' }],
    Email: 'victor.souto@hotmail.com',
    Ip: '189.124.123.152',
    Name: 'Nome da pessoa',
    Phones: [{ AreaCode: '48', Number: '991176891', PhoneType: '4' }],
  },
  Currency: 'BRL',
  FraudId: 'e50ac9fa-e789-4b96-b0f2-e9ae1b8c02a0',
  Items: [
    {
      Category: 'IN8',
      Description: 'IN8 Payment Transaction',
      Price: 1000,
      Quantity: '1',
      Reference: '643587f84970a2dd0e014f7c',
    },
  ],
  OrderOriginCompanyName: 'IN8 Payments Hub',
  OrderOriginData: { Key: 'CNPJ', Value: '32.778.350/0001-70' },
  PaymentType:
    '4BrrOW/geLG83sM442ABGKsUzWlxChP9OREFFSeEM6sxTLiOJ4z/4TtmlX/fvWagefrjChwEe4yCvxAARkKas2hVw2dxMptzD6A9Juruc4f5Ln9WsodEiT4LrcU1XoV2',
  Price: 1000,
  Reference: '643587f84970a2dd0e014f7c',
  Shipping: {
    Address: {
      AddressType: '1',
      City: 'Criciúma',
      Country: 'BRA',
      Number: '222',
      State: 'SC',
      Street: 'Rua Diogo Cardoso Feuser',
      ZipCode: '88805-813',
    },
    DeliveryDate: '2023-4-11',
    Price: '0.00',
  },
};
