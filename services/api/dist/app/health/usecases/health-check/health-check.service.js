"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const terminus_1 = require("@nestjs/terminus");
let HealthCheckService = class HealthCheckService {
    constructor(health, disk, memory, microservice, configService) {
        this.health = health;
        this.disk = disk;
        this.memory = memory;
        this.microservice = microservice;
        this.configService = configService;
    }
    async execute() {
        return this.health.check([
            () => this.disk.checkStorage('storage', {
                path: '/',
                thresholdPercent: 0.95,
            }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_PAGARME_HOST'),
                    port: 3001,
                },
            }),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_PAGSEGURO_HOST'),
                    port: 3002,
                },
            }),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_PAYPAL_HOST'),
                    port: 3003,
                },
            }),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_VINDI_HOST'),
                    port: 3004,
                },
            }),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_MERCADOPAGO_HOST'),
                    port: 3005,
                },
            }),
            () => this.microservice.pingCheck('tcp', {
                transport: microservices_1.Transport.TCP,
                options: {
                    host: this.configService.get('MICRO_KOIN_HOST'),
                    port: 3008,
                },
            }),
        ]);
    }
};
HealthCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.DiskHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.MicroserviceHealthIndicator,
        config_1.ConfigService])
], HealthCheckService);
exports.HealthCheckService = HealthCheckService;
//# sourceMappingURL=health-check.service.js.map