import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';

@Injectable()
export class DeleteClientService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const client = await this.clientsRepository.delete(id);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      return;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
