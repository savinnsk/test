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
exports.GetPublicKeysService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let GetPublicKeysService = class GetPublicKeysService {
    constructor(pagseguroClient) {
        this.pagseguroClient = pagseguroClient;
    }
    async execute(query, client) {
        const [paymentsConfigs, paymentGateway] = [
            client.paymentsConfigs,
            query.payment_gateway,
        ];
        const gatewayKey = this.getGatewayKey(paymentsConfigs, paymentGateway);
        const publicKeyResponse = await this.send(paymentGateway, 'get-public-key', {
            data: {
                authorization: gatewayKey.key,
            },
        });
        return publicKeyResponse;
    }
    async send(paymentGateway, action, payload) {
        return await (0, rxjs_1.firstValueFrom)(this.getPaymentGatewayClient(paymentGateway).send(`${paymentGateway}-${action}`, payload));
    }
    getPaymentGatewayClient(paymentGateway) {
        return this[`${paymentGateway}Client`];
    }
    getGatewayKey(paymentConfigs, getewayName) {
        const currentPaymentConfig = paymentConfigs.find((paymentConfig) => paymentConfig.name === getewayName);
        return currentPaymentConfig;
    }
};
GetPublicKeysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAGSEGURO')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], GetPublicKeysService);
exports.GetPublicKeysService = GetPublicKeysService;
//# sourceMappingURL=get-public-keys.service.js.map