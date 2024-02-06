import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class FindAllClientService {
    private readonly clientsRepository;
    constructor(clientsRepository: ClientsRepository);
    execute(params: PaginationRequest): Promise<PaginationResponse>;
}
