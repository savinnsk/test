import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { Client, ClientDocument } from '@domain/entities/client/client.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class MongoClientsRepository implements ClientsRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(params: {
    client: CreateClientDto & { apiKey: string };
  }): Promise<ClientDocument> {
    return await this.clientModel.create(params.client);
  }

  async updateByApiKey(
    apiKey: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument> {
    return await this.clientModel
      .findOneAndUpdate({ apiKey }, { ...params.client }, { new: true })
      .populate('paymentsConfigs')
      .exec();
  }

  async update(
    id: string,
    params: { client: UpdateClientDto },
  ): Promise<ClientDocument> {
    return await this.clientModel
      .findByIdAndUpdate(id, { ...params.client }, { new: true })
      .exec();
  }

  async findAll(params: PaginationRequest): Promise<PaginationResponse> {
    const total = await this.clientModel.countDocuments();

    if (!params.page) {
      params.limit = total;
      params.page = 1;
    }

    console.log('limit', params.limit);
    const clients = await this.clientModel
      .find()
      .limit(params.limit * 1)
      .skip((params.page - 1) * params.limit)
      .populate('paymentsConfigs')
      .exec();

    return {
      content: clients,
      total_items: total,
      page: params.page,
    };
  }

  async findById(id: string): Promise<ClientDocument> {
    return await this.clientModel
      .findById(id)
      .populate('paymentsConfigs')
      .exec();
  }

  async findByApiKey(apiKey: string): Promise<ClientDocument> {
    return await this.clientModel
      .findOne({ apiKey })
      .populate('paymentsConfigs')
      .exec();
  }

  async delete(id: string): Promise<ClientDocument> {
    return await this.clientModel.findByIdAndDelete({ id }).exec();
  }
}
