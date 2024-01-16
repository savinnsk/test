import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ClientDocument } from '@domain/entities/client/client.schema';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';

// TODO: Refatorar
interface IUpdateClientService {
  apiKey: string;
  updateClientDto: UpdateClientDto;
}

@Injectable()
export class UpdateClientByApiKeyService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly paymentsConfigsRepository: PaymentsConfigsRepository,
  ) {}

  async execute({
    apiKey,
    updateClientDto,
  }: IUpdateClientService): Promise<ClientDocument> {
    try {
      const currentClient = await this.clientsRepository.findByApiKey(apiKey);
      if (!currentClient) {
        throw new NotFoundException('Client not found');
      }
      const paymentsConfigs = currentClient.paymentsConfigs;

      const paymentsConfigNames = updateClientDto.paymentsConfigs.map(
        (config) => config.name,
      );
      const configsWillRemoved = paymentsConfigs.filter((config) => {
        return paymentsConfigNames.includes(config.name);
      });
      await this.paymentsConfigsRepository.deleteMany({
        paymentsConfigs: configsWillRemoved,
      });

      const paymentsConfigCreated =
        await this.paymentsConfigsRepository.createMany({
          paymentsConfigs: updateClientDto.paymentsConfigs,
        });

      const updatedClient = await this.clientsRepository.updateByApiKey(
        apiKey,
        {
          client: {
            ...updateClientDto,
            paymentsConfigs: paymentsConfigCreated,
          },
        },
      );
      if (!updatedClient) {
        throw new NotFoundException('Client not found');
      }
      return updatedClient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
