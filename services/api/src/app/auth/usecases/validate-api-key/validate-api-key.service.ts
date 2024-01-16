import { Injectable } from '@nestjs/common';

import { FindClientByApiKeyService } from '@app/clients/usecases/find-client-by-api-key/find-client-by-api-key.service';
import { Client } from '@domain/entities/client/client.schema';

@Injectable()
export class ValidateApiKeyService {
  constructor(
    private readonly findClientByApiKeyService: FindClientByApiKeyService,
  ) {}

  async execute(apiKey: string): Promise<Client | null> {
    return await this.findClientByApiKeyService.execute(apiKey);
  }
}
