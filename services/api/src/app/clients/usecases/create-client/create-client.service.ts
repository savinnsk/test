import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ClientDocument } from '@domain/entities/client/client.schema';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';

// TODO: Refatorar
interface ICreateClientService {
  createClientDto: CreateClientDto;
}

@Injectable()
export class CreateClientService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly paymentsConfigsRepository: PaymentsConfigsRepository,
  ) {}

  async execute({
    createClientDto,
  }: ICreateClientService): Promise<ClientDocument> {
    try {
      const apiKey = `pph_${uuid()}`;

      const hasPaymentsConfigs =
        createClientDto?.paymentsConfigs.length > 0 ||
        createClientDto.paymentsConfigs;
      const paymentsConfigs = hasPaymentsConfigs
        ? await this.paymentsConfigsRepository.createMany({
            paymentsConfigs: createClientDto.paymentsConfigs,
          })
        : [];

      const createdClient = await this.clientsRepository.create({
        client: {
          ...createClientDto,
          apiKey: apiKey,
          paymentsConfigs,
        },
      });
      createdClient.apiKey = apiKey;

      return createdClient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
