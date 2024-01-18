export type Phone = {
    home_phone?: PhoneObject;
    mobile_phone?: PhoneObject;
};
export type PhoneObject = {
    CountryCode: string;
    AreaCode: string;
    Number: string;
};
