import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { ClientDocument } from '@domain/entities/client/client.schema';

@Injectable()
export class FindClientByIdService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(id: string): Promise<ClientDocument | null> {
    try {
      return await this.clientsRepository.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
