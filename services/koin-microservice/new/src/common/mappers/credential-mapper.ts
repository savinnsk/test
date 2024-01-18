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

export class CredentialsMapper {
  static getKeysValue(credentials: string): Credentials {
    // Split the input string by commas
    const keyValuePairs = credentials.split(',');

    // Create an object to store key-value pairs
    const keyValueObject = {};

    // Iterate through key-value pairs and populate the object
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      keyValueObject[key] = value;
    });

    return keyValueObject;
  }
}
