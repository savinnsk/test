import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  DiskHealthIndicator,
  HealthCheckService as CheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly health: CheckService,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  async execute() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.95,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_PAGARME_HOST'),
            port: 3001,
          },
        }),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_PAGSEGURO_HOST'),
            port: 3002,
          },
        }),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_PAYPAL_HOST'),
            port: 3003,
          },
        }),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_VINDI_HOST'),
            port: 3004,
          },
        }),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_MERCADOPAGO_HOST'),
            port: 3005,
          },
        }),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get<string>('MICRO_KOIN_HOST'),
            port: 3008,
          },
        }),
    ]);
  }
}
