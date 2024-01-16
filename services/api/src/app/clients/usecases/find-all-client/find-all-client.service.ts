import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ClientsRepository } from '@app/clients/repositories/clients.repository';

import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class FindAllClientService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(params: PaginationRequest): Promise<PaginationResponse> {
    try {
      return await this.clientsRepository.findAll(params);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
