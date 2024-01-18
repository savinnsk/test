import { HealthCheckService } from '@app/health/usecases/health-check/health-check.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthCheckService);
    execute(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
