import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { ClientDocument } from '@domain/entities/client/client.schema';
export declare class FindClientByIdService {
    private readonly clientsRepository;
    constructor(clientsRepository: ClientsRepository);
    execute(id: string): Promise<ClientDocument | null>;
}
