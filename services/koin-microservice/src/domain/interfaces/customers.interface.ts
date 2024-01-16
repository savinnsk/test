import { DocumentType, Gender, TypeCustomer } from '../enums/payment.enum';
import { IAddress } from './address.interface';
import { Phone } from './phone.interface';

export interface ICreateCustomerRequest {
  name: string;
  type?: TypeCustomer;
  email?: string;
  code?: string;
  document?: string;
  document_type?: DocumentType;
  gender?: Gender;
  address?: IAddress;
  phones?: Phone;
  birthdate?: Date;
  metadata?: any;
}

export interface ICreateCustomerResponse {
  id: string;
  name: string;
  type?: TypeCustomer;
  email?: string;
  code?: string;
  document?: string;
  document_type?: DocumentType;
  gender?: Gender;
  address?: IAddress;
  phones?: Phone;
  metadata?: any;
  birthdate?: Date;
  fb_id?: string;
  fb_access_token?: string;
  delinquent?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
