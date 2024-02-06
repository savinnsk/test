export declare class CreateClientDto {
    name: string;
    apiKey?: string;
    paymentsConfigs?: {
        name: string;
        key?: string;
        publicKey?: string;
        username?: string;
        password?: string;
    }[];
}
