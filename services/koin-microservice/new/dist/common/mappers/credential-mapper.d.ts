export interface Credentials {
    iss?: string;
    secret?: string;
    kid?: string;
    businessId?: string;
    referenceId?: string;
    account_number?: string;
    publicKey?: string;
    privateKey?: string;
}
export declare class CredentialsMapper {
    static getKeysValue(credentials: string): Credentials;
}
