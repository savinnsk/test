import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { PlanDocument } from '@domain/entities/plan/plan.schema';
import { CreateProductService } from '@app/products/usecases/create-product/create-product.service';
import { ClientProxy } from '@nestjs/microservices';
import { Client } from '@domain/entities/client/client.schema';
export declare class CreatePlanService {
    private readonly plansRepository;
    private readonly createProductService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly vindiClient;
    constructor(plansRepository: PlansRepository, createProductService: CreateProductService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, vindiClient: ClientProxy);
    execute(plan: CreatePlanDto, client: Client): Promise<PlanDocument>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
}
