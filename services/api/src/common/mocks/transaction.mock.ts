import { CreateTransactionDto } from '@domain/dtos/transaction/create-transaction.dto';

export const createCreditCardTransaction = {
  paymentGateway: 'pagarme',
  amount: 10,
  installments: 1,
  currency: 'BRL',
  description: 'Descricao do produto',
  code: '0001',
  callbackUrl: 'https://webhook.site/33337573-c788-4430-ad10-e57767cac4dc',
  payer: {
    firstName: 'Wilson Filipe da Silva',
    lastName: 'Wilson Da silva',
    email: 'wilson@in8.com.br',
    phone: '+55 (48) 2773-9807',
    document: '57867393099',
    documentType: 'CPF',
    dateOfBirth: '1994-02-28',
    billingAddress: {
      street: 'Rua Diogo Cardoso Feuser',
      number: 222,
      neighborhood: 'Imperatriz',
      city: 'Criciúma',
      state: 'SC',
      country: 'BR',
      zipCode: '88805-813',
    },
  },
  paymentMethod: 'credit_card',
  creditCard: {
    holderName: 'WILSON F SILVA',
    number: '4235647728025682',
    expirationMonth: 11,
    expirationYear: 2025,
    cvv: '123',
  },
} as any as CreateTransactionDto;

export const updateTransaction = {
  paymentGateway: 'pagarme',
  amount: 2000,
  installments: 1,
  currency: 'BRL',
  description: 'Descricao do produto atualizada',
} as any as CreateTransactionDto;

export const createPixTransaction = {
  paymentGateway: 'pagseguro',
  amount: 100.76,
  currency: 'BRL',
  payer: {
    firstName: 'Gustavo',
    lastName: 'Candioto',
    email: 'wandeson@in8.com.br',
    phone: '+55 (31) 986611580',
    document: '11050897625',
    documentType: 'CPF',
    dateOfBirth: '1994-02-28',
    billingAddress: {
      street: 'Rua Expedicionário Antônio Nascimento',
      number: 162,
      neighborhood: 'Palmares',
      city: 'Belo Horizonte',
      state: 'MG',
      country: 'BR',
      zipCode: '31155-450',
    },
  },
  paymentMethod: 'pix',
  description: 'compra',
  code: '0001',
  callbackUrl: 'http://api:3000/v1/payments/callback',
} as any as CreateTransactionDto;

export const createBilletTransaction = {
  paymentGateway: 'vindi',
  amount: 10,
  installments: 1,
  callbackUrl: 'https://webhook.site/33337573-c788-4430-ad10-e57767cac4dc',
  currency: 'USD',
  payer: {
    firstName: 'Cauê Filipe',
    lastName: 'César dos Santos',
    email: 'cauefilipedossantos@gtx.ag',
    phone: '+55 (48) 2773-9807',
    document: '98512980508',
    documentType: 'CPF',
    dateOfBirth: '1994-02-28',
    billingAddress: {
      street: 'Rua Diogo Cardoso Feuser',
      number: 222,
      neighborhood: 'Imperatriz',
      city: 'Criciúma',
      state: 'SC',
      country: 'BR',
      zipCode: '88805-813',
    },
  },
  paymentMethod: 'billet',
  description: 'compra',
  code: '0001',
} as any as CreateTransactionDto;
