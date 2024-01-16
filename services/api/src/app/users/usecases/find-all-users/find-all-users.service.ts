import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/users/repositories/users.repository';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(params?: PaginationRequest): Promise<PaginationResponse> {
    return await this.usersRepository.findAll(params);
  }
}
