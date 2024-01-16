import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { ClientDocument } from '@domain/entities/client/client.schema';

@Injectable()
export class FindClientByApiKeyService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(apiKey: string): Promise<ClientDocument | null> {
    try {
      return await this.clientsRepository.findByApiKey(apiKey);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
