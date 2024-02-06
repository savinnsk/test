"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPaymentsConfigsRepository = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
let InMemoryPaymentsConfigsRepository = class InMemoryPaymentsConfigsRepository {
    constructor() {
        this.paymentsConfigs = [];
    }
    async deleteMany({ paymentsConfigs }) {
        const ids = paymentsConfigs.map((paymentConfig) => paymentConfig.id);
        this.paymentsConfigs = this.paymentsConfigs.filter((paymentConfig) => !ids.includes(paymentConfig.id));
        return;
    }
    async findById(id) {
        return this.paymentsConfigs.find((paymentConfig) => paymentConfig.id === id);
    }
    async create(params) {
        var _a;
        const config = Object.assign(Object.assign({}, params.paymentConfig), { id: (_a = params.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)(), createdAt: new Date(), updatedAt: new Date() });
        this.paymentsConfigs.push(config);
        return config;
    }
    async createMany({ paymentsConfigs, }) {
        const configs = [];
        for (const config of paymentsConfigs) {
            const persitedConfig = await this.create({ paymentConfig: config });
            configs.push(persitedConfig);
        }
        return configs;
    }
};
InMemoryPaymentsConfigsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryPaymentsConfigsRepository);
exports.InMemoryPaymentsConfigsRepository = InMemoryPaymentsConfigsRepository;
//# sourceMappingURL=payments-configs.repository.js.map