import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientDocument } from '@domain/entities/client/client.schema';
export declare class InMemoryClientsRepository implements ClientsRepository {
    clients: ClientDocument[];
    create(params: {
        client: CreateClientDto & {
            apiKey: string;
        };
        id?: string;
    }): Promise<ClientDocument>;
    updateByApiKey(apiKey: string, params: {
        client: UpdateClientDto;
    }): Promise<ClientDocument>;
    update(id: string, params: {
        client: UpdateClientDto;
    }): Promise<ClientDocument>;
    findAll(): Promise<any>;
    findById(id: string): Promise<ClientDocument>;
    findByApiKey(apiKey: string): Promise<ClientDocument>;
    delete(id: string): Promise<ClientDocument>;
}
