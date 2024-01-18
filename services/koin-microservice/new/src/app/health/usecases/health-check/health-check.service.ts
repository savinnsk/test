import { Injectable } from '@nestjs/common';
import {
  HttpHealthIndicator,
  HealthCheckService as HealthCheckServiceTerminus,
} from '@nestjs/terminus';

@Injectable()
export class HealthCheckService {
  constructor(
    private health: HealthCheckServiceTerminus,
    private http: HttpHealthIndicator,
  ) {}

  async execute() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
