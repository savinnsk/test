import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { HashService } from '@common/hash/hash.service';
import { IValidationPasswordService } from '@domain/interfaces/validation-password.interface';

@Injectable()
export class ValidationPasswordService {
  constructor(private readonly hashService: HashService) {}

  async execute({ password, user }: IValidationPasswordService) {
    try {
      return await this.hashService.compare(password, user.password);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
