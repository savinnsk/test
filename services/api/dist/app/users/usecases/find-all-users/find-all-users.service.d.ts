import { UsersRepository } from '@app/users/repositories/users.repository';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class FindAllUsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(params?: PaginationRequest): Promise<PaginationResponse>;
}
