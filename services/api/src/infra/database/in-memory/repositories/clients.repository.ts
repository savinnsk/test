import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientDocument } from '@domain/entities/client/client.schema';

@Injectable()
export class InMemoryClientsRepository implements ClientsRepository {
  clients: ClientDocument[] = [];

  async create(params: {
    client: CreateClientDto & { apiKey: string };
    id?: string;
  }): Promise<ClientDocument> {
    const client = {
      ...params.client,
      id: params.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any as ClientDocument;

    this.clients.push(client);
    return client;
  }

  async updateByApiKey(
    apiKey: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument> {
    const client = this.clients.find((client) => client.apiKey === apiKey);
    if (client) {
      Object.assign(client, params.client);
    }
    return client ?? null;
  }

  async update(
    id: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument> {
    const client = this.clients.find((client) => client.id === id);
    if (client) {
      Object.assign(client, params.client);
    }
    return client ?? null;
  }

  async findAll(): Promise<any> {
    return this.clients;
  }

  async findById(id: string): Promise<ClientDocument> {
    return this.clients.find((client) => client.id === id) ?? null;
  }

  async findByApiKey(apiKey: string): Promise<ClientDocument> {
    return this.clients.find((client) => client.apiKey === apiKey) ?? null;
  }

  async delete(id: string): Promise<ClientDocument> {
    const current = await this.findById(id);
    this.clients = this.clients.filter((client) => client.id !== id);
    return current;
  }
}
