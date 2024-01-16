import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UsersRepository } from '@app/users/repositories/users.repository';

@Injectable()
export class FindUserByIdService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
