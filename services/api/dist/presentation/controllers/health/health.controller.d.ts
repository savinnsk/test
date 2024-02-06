import { ClientProxy } from '@nestjs/microservices';
import { HealthCheckService } from '@app/health/usecases/health-check/health-check.service';
export declare class HealthController {
    private readonly healthCheckService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly koinClient;
    private readonly vindiClient;
    constructor(healthCheckService: HealthCheckService, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, koinClient: ClientProxy, vindiClient: ClientProxy);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
