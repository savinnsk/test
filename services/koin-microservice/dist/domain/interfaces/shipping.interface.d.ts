import { IAddress } from './address.interface';
export type Shipping = {
    address: IAddress;
    amount: number;
    description: string;
    recipient_name: string;
    recipient_phone: string;
};
