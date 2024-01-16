import { IAddress } from './address.interface';

export interface CreditCardModel {
  card: {
    billing_address: IAddress;
    number: string;
    holder_name: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
  };
  operation_type: 'auth_and_capture' | 'auth_only' | 'pre_auth';
  recurrence: boolean;
  installments: number;
  statement_descriptor?: string;
  card_id?: string;
  card_token?: string;
}

export interface Billet {
  bank: '001' | '033' | '237' | '341' | '745' | '104'; // Código do banco. 001 (Banco do Brasil); 033 (Santander); 237 (Bradesco); 341 (Itau); 745 (Citibank) e 104 (Caixa Econômica Federal).
  instructions: string;
  due_at?: string;
  nosso_numero: string;
  type: 'DM' | 'BDP'; // Tipo de espécie do boleto.DM (Duplicata Mercantil) e BDP (Boleto de proposta)
  document_number: string;
  interest: {
    days: number;
    type: string;
    amount: string;
  };
  fine: {
    days: number;
    type: string;
    amount: string;
  };
}

export interface Pix {
  expires_in: number;
  expires_at?: Date;
  additional_information?: {
    name: string;
    value: string;
  };
}

export interface PaymentMethod {
  credit_card?: CreditCardModel;
  pix?: Pix;
  boleto?: Billet;
  payment_method: 'credit_card' | 'boleto' | 'pix';
  amount: number;
}
