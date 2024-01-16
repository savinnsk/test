import { StatusOrder } from '../enums/payment.enum';
import {
  ICreateCustomerRequest,
  ICreateCustomerResponse,
} from './customers.interface';
import { Item } from './Item.interface';
import { CreditCardModel, PaymentMethod } from './payment_methods.interface';
import { Shipping } from './shipping.interface';

export interface IChageRequest {
  amount: number;
  currency: string;
  installments: number;
  description: string;
  payer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    document: string;
    documentType: 'CPF' | 'CNPJ' | 'PASSPORT';
    dateOfBirth: string; // '1994-02-28'
    billingAddress: {
      street: string;
      number: number;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
  paymentMethod: 'credit_card' | 'debit_card' | 'billet';
  creditCard: {
    holderName: string;
    number: string;
    expirationMonth: number;
    expirationYear: number;
    cvv: string;
  };
}

export interface IOrderPagarmeRequest {
  code?: string;
  customer?: ICreateCustomerRequest;
  customer_id?: string;
  items: Item[];
  shipping?: Shipping;
  payments: PaymentMethod[];
  device?: { platform: string };
  location?: { latitude: string; longitude: string };
  antifraud?: { type: string; clearsale: { custom_sla: string } };
  ip?: string;
  session_id?: string;
  antifraud_ref_id?: string;
  closed?: boolean;
  metadata?: any;
}

export interface IOrderResponse {
  id: string;
  code: string;
  amount: number;
  currency: string;
  closed: boolean;
  items: Item[];
  customer: ICreateCustomerResponse;
  shipping: Shipping;
  status: 'paid';
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  charges: {
    id: string;
    code: string;
    gateway_id: string;
    amount: number;
    status: StatusOrder;
    currency: string;
    payment_method: 'credit_card' | 'boleto' | 'pix';
    paid_at: Date;
    created_at: Date;
    updated_at: Date;
    customer: ICreateCustomerResponse;
    last_transaction: {
      id: string;
      transaction_type: 'credit_card' | 'boleto' | 'pix';
      gateway_id: string;
      amount: number;
      status: StatusOrder;
      success: true;
      installments: number;
      statement_descriptor: string;
      acquirer_name: string;
      acquirer_affiliation_code: string;
      acquirer_tid: string;
      acquirer_nsu: string;
      acquirer_auth_code: string;
      acquirer_message: string;
      acquirer_return_code: string;
      operation_type: 'auth_and_capture' | 'auth_only' | 'pre_auth';
      card: CreditCardModel;
      created_at: Date;
      updated_at: Date;
      gateway_response: {
        code: string;
      };
      antifraud_response: {
        provider_name: string;
        status: string;
        return_code: string;
        return_message: string;
        score: string;
      };
      barcode?: string;
      qr_code?: string;
      nosso_numero?: string;
      type?: string;
      bank?: string;
      document_number?: string;
      instructions?: string;
      due_at?: string;
      interest?: {
        days: number;
        type: string;
        amount: string;
      };
      fine?: {
        days: number;
        type: string;
        amount: string;
      };
      expires_at: string;
      qr_code_url: string;
    };
  }[];
  metadata?: any;
}
