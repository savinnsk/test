import { ConfigService } from '@nestjs/config';
import { DiskHealthIndicator, HealthCheckService as CheckService, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
export declare class HealthCheckService {
    private readonly health;
    private readonly disk;
    private memory;
    private microservice;
    private configService;
    constructor(health: CheckService, disk: DiskHealthIndicator, memory: MemoryHealthIndicator, microservice: MicroserviceHealthIndicator, configService: ConfigService);
    execute(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
