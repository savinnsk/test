import { ClientsRepository } from '@app/clients/repositories/clients.repository';
export declare class DeleteClientService {
    private readonly clientsRepository;
    constructor(clientsRepository: ClientsRepository);
    execute(id: string): Promise<void>;
}
