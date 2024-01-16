import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UsersRepository } from '@app/users/repositories/users.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
