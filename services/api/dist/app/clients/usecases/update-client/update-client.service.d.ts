import { ClientDocument } from '@domain/entities/client/client.schema';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientsRepository } from '@app/clients/repositories/clients.repository';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
interface IUpdateClientService {
    id: string;
    updateClientDto: UpdateClientDto;
}
export declare class UpdateClientService {
    private readonly clientsRepository;
    private readonly paymentsConfigsRepository;
    constructor(clientsRepository: ClientsRepository, paymentsConfigsRepository: PaymentsConfigsRepository);
    execute({ id, updateClientDto, }: IUpdateClientService): Promise<ClientDocument>;
}
export {};
