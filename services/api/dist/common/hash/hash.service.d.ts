import { HashingAlgorithm } from '../enums/hash.enum';
export declare class HashService {
    hash(stringToHash: string, algo?: HashingAlgorithm): Promise<string>;
    compare(string: string, hash: string, algo?: HashingAlgorithm): Promise<boolean>;
}
