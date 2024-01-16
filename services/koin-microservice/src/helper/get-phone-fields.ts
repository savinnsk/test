import { PhoneObject } from '../domain/interfaces/phone.interface';

export const getPhoneFields = (phone: string): PhoneObject | null => {
  const regex = /\d/g;
  const phoneFormatted = phone.match(regex)?.join('');

  if (phoneFormatted && phoneFormatted.length >= 12) {
    const CountryCode = phoneFormatted.slice(0, 2);
    const AreaCode = phoneFormatted.slice(2, 4);
    const Number = phoneFormatted.slice(4);

    return {
      CountryCode,
      AreaCode,
      Number,
    };
  }

  return null;
};
