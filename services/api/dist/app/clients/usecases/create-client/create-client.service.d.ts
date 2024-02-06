import { ClientDocument } from '@domain/entities/client/client.schema';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
interface ICreateClientService {
    createClientDto: CreateClientDto;
}
export declare class CreateClientService {
    private readonly clientsRepository;
    private readonly paymentsConfigsRepository;
    constructor(clientsRepository: ClientsRepository, paymentsConfigsRepository: PaymentsConfigsRepository);
    execute({ createClientDto, }: ICreateClientService): Promise<ClientDocument>;
}
export {};
