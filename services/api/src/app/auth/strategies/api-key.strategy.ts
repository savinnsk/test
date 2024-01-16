import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ValidateApiKeyService } from '../usecases/validate-api-key/validate-api-key.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private validateApiKeyService: ValidateApiKeyService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      const validApiClient = await this.validateApiKeyService.execute(apiKey);
      if (validApiClient !== null) {
        done(null, validApiClient);
      }

      done(new UnauthorizedException(), null);
    });
  }
}
