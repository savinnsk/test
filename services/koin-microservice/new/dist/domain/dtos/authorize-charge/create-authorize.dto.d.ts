export interface CreateAuthorizeDto {
    Cpf: string;
    Email: string;
    TotalPrice: string;
    UseDate?: string;
    Ip: string;
    Optin: string;
    ProductType?: string[];
    SalesChannelId?: string;
    MaxInstallments: string;
    AdditionalData: {
        CarRentalData: any;
    };
}
