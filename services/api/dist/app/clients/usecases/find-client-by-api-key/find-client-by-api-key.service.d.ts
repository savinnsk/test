import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { ClientDocument } from '@domain/entities/client/client.schema';
export declare class FindClientByApiKeyService {
    private readonly clientsRepository;
    constructor(clientsRepository: ClientsRepository);
    execute(apiKey: string): Promise<ClientDocument | null>;
}
