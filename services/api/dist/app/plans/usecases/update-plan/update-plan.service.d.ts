import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { ClientProxy } from '@nestjs/microservices';
import { FindPlanService } from '../find-plan/find-plan.service';
import { Client } from '@domain/entities/client/client.schema';
export declare class UpdatePlanService {
    private readonly plansRepository;
    private readonly findPlanService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(plansRepository: PlansRepository, findPlanService: FindPlanService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(data: UpdatePlanDto, id: string, client: Client): Promise<any>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
