import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ClientDocument } from '@domain/entities/client/client.schema';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';

interface IUpdateClientService {
  id: string;
  updateClientDto: UpdateClientDto;
}

@Injectable()
export class UpdateClientService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly paymentsConfigsRepository: PaymentsConfigsRepository,
  ) {}

  async execute({
    id,
    updateClientDto,
  }: IUpdateClientService): Promise<ClientDocument> {
    try {
      // pegar os paymentsConfigs que já existe
      const currentClient = await this.clientsRepository.findById(id);
      if (!currentClient) {
        throw new NotFoundException('Client not found');
      }
      const paymentsConfigs = currentClient.paymentsConfigs;
      // excluir os que irão ser atualizados
      const paymentsConfigNames = updateClientDto.paymentsConfigs.map(
        (config) => config.name,
      );
      const configsWillRemoved = paymentsConfigs.filter((config) => {
        return paymentsConfigNames.includes(config.name);
      });
      console.log(
        '🚀 ~ file: update-client.service.ts:42 ~ UpdateClientService ~ configsWillRemoved ~ configsWillRemoved:',
        configsWillRemoved,
      );
      await this.paymentsConfigsRepository.deleteMany({
        paymentsConfigs: configsWillRemoved,
      });

      // criar os que irão ser atualizados
      const paymentsConfigCreated =
        await this.paymentsConfigsRepository.createMany({
          paymentsConfigs: updateClientDto.paymentsConfigs,
        });

      const updatedClient = await this.clientsRepository.update(id, {
        client: {
          ...updateClientDto,
          paymentsConfigs: paymentsConfigCreated,
        },
      });
      if (!updatedClient) {
        throw new NotFoundException('Client not found');
      }
      return updatedClient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
