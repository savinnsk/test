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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCreditService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let VerifyCreditService = class VerifyCreditService {
    constructor(pagseguroClient, paypalClient, pagarmeClient, mercadopagoClient, vindiClient) {
        this.pagseguroClient = pagseguroClient;
        this.paypalClient = paypalClient;
        this.pagarmeClient = pagarmeClient;
        this.mercadopagoClient = mercadopagoClient;
        this.vindiClient = vindiClient;
    }
    async execute(data, client) {
        try {
            const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, data.paymentGateway);
            const result = await this.send(data.paymentGateway, 'verify-subscription', {
                data,
                config: currentPaymentConfig,
            });
            console.log('result', result);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getPaymentGatewayClient(paymentGateway) {
        return this[`${paymentGateway}Client`];
    }
    async send(paymentGateway, action, payload) {
        return await (0, rxjs_1.firstValueFrom)(this.getPaymentGatewayClient(paymentGateway).send(`${paymentGateway}-${action}`, payload));
    }
    getGatewayKey(paymentConfigs, getewayName) {
        const currentPaymentConfig = paymentConfigs.find((paymentConfig) => paymentConfig.name === getewayName);
        return currentPaymentConfig;
    }
};
VerifyCreditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAGSEGURO')),
    __param(1, (0, common_1.Inject)('PAYPAL')),
    __param(2, (0, common_1.Inject)('PAGARME')),
    __param(3, (0, common_1.Inject)('MERCADOPAGO')),
    __param(4, (0, common_1.Inject)('VINDI')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], VerifyCreditService);
exports.VerifyCreditService = VerifyCreditService;
//# sourceMappingURL=verify-credit.service.js.map