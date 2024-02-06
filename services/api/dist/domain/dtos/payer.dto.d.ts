import { AddressDto } from './address.dto';
export declare class PayerDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    document: string;
    documentType: 'CPF' | 'CNPJ' | 'PASSPORT';
    dateOfBirth: string;
    billingAddress: AddressDto;
    shippingAddress?: AddressDto;
}
