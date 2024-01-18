import { HealthCheckService } from '@app/health/usecases/health-check/health-check.service';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthCheckService) {}

  @Get()
  execute() {
    return this.healthService.execute();
  }
}
