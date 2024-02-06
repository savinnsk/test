import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ValidateApiKeyService } from '../usecases/validate-api-key/validate-api-key.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private validateApiKeyService;
    constructor(validateApiKeyService: ValidateApiKeyService);
}
export {};
