import { Model } from 'mongoose';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientDocument } from '@domain/entities/client/client.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class MongoClientsRepository implements ClientsRepository {
    private readonly clientModel;
    constructor(clientModel: Model<ClientDocument>);
    create(params: {
        client: CreateClientDto & {
            apiKey: string;
        };
    }): Promise<ClientDocument>;
    updateByApiKey(apiKey: string, params: {
        client: UpdateClientDto;
    }): Promise<ClientDocument>;
    update(id: string, params: {
        client: UpdateClientDto;
    }): Promise<ClientDocument>;
    findAll(params: PaginationRequest): Promise<PaginationResponse>;
    findById(id: string): Promise<ClientDocument>;
    findByApiKey(apiKey: string): Promise<ClientDocument>;
    delete(id: string): Promise<ClientDocument>;
}
