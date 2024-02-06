import { FindClientByApiKeyService } from '@app/clients/usecases/find-client-by-api-key/find-client-by-api-key.service';
import { Client } from '@domain/entities/client/client.schema';
export declare class ValidateApiKeyService {
    private readonly findClientByApiKeyService;
    constructor(findClientByApiKeyService: FindClientByApiKeyService);
    execute(apiKey: string): Promise<Client | null>;
}
