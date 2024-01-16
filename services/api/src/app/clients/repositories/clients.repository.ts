import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
import { ClientDocument } from '@domain/entities/client/client.schema';

export abstract class ClientsRepository {
  abstract create(params: {
    client: CreateClientDto & { apiKey: string };
    id?: string;
  }): Promise<ClientDocument>;
  abstract update(
    id: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument>;
  abstract updateByApiKey(
    apiKey: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument>;
  abstract findAll(params?: PaginationRequest): Promise<PaginationResponse>;
  abstract findById(id: string): Promise<ClientDocument | null>;
  abstract findByApiKey(apiKey: string): Promise<ClientDocument | null>;
  abstract delete(id: string): Promise<ClientDocument>;
}
