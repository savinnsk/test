import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { HashingAlgorithm } from '@common/enums/hash.enum';
import { HashService } from '@common/hash/hash.service';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UsersRepository } from '@app/users/repositories/users.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly hashService: HashService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashService.hash(
        createUserDto.password,
        HashingAlgorithm.bcrypt,
      );
      createUserDto.password = hashedPassword;
      return await this.usersRepository.create({ user: createUserDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
