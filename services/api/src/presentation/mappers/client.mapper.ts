import { ClientDocument } from '@domain/entities/client/client.schema';

interface IToJsonRequest {
  data: ClientDocument;
  showApiKey?: boolean;
}

export class ClientMapper {
  static toJSON({ data, showApiKey = false }: IToJsonRequest) {
    return {
      id: data._id,
      name: data.name,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      apiKey: showApiKey ? data.apiKey : undefined,
      paymentsConfigs: data.paymentsConfigs,
    };
  }
}
