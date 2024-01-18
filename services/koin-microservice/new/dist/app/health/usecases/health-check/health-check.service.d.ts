import { HttpHealthIndicator, HealthCheckService as HealthCheckServiceTerminus } from '@nestjs/terminus';
export declare class HealthCheckService {
    private health;
    private http;
    constructor(health: HealthCheckServiceTerminus, http: HttpHealthIndicator);
    execute(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
