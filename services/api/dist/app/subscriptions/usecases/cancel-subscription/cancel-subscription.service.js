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
exports.CancelSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_repository_1 = require("../../repositories/subscriptions.repository");
const microservices_1 = require("@nestjs/microservices");
const payment_enum_1 = require("../../../payments/enums/payment.enum");
const rxjs_1 = require("rxjs");
const find_subscription_service_1 = require("../find-subscription/find-subscription.service");
const respose_is_error_type_1 = require("../../../../helpers/functions/respose-is-error-type");
const plans_repository_1 = require("../../../plans/repositories/plans.repository");
let CancelSubscriptionService = class CancelSubscriptionService {
    constructor(subscriptionsRepository, plansRepository, findSubscriptionService, pagseguroClient, paypalClient, pagarmeClient, mercadopagoClient, vindiClient) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.plansRepository = plansRepository;
        this.findSubscriptionService = findSubscriptionService;
        this.pagseguroClient = pagseguroClient;
        this.paypalClient = paypalClient;
        this.pagarmeClient = pagarmeClient;
        this.mercadopagoClient = mercadopagoClient;
        this.vindiClient = vindiClient;
    }
    async execute({ id, client }) {
        var _a, _b;
        try {
            const subscription = await this.findSubscriptionService.execute(id, {
                throwErrors: false,
            });
            const paymentGateway = (_a = subscription === null || subscription === void 0 ? void 0 : subscription.paymentGateway) !== null && _a !== void 0 ? _a : payment_enum_1.PaymentGateway.Vindi;
            const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, paymentGateway);
            const data = await this.send(paymentGateway, 'cancel-subscription', {
                data: {
                    id: (_b = subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId) !== null && _b !== void 0 ? _b : id,
                    existsInOrDB: !!(subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId),
                },
                config: currentPaymentConfig,
            });
            if ((0, respose_is_error_type_1.responseIsAErrorType)(data)) {
                return data;
            }
            let result = {};
            if (subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId) {
                result = await this.subscriptionsRepository.partialUpdate(data, subscription.id);
            }
            return result;
        }
        catch (error) {
            console.log(error);
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
CancelSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('PAGSEGURO')),
    __param(4, (0, common_1.Inject)('PAYPAL')),
    __param(5, (0, common_1.Inject)('PAGARME')),
    __param(6, (0, common_1.Inject)('MERCADOPAGO')),
    __param(7, (0, common_1.Inject)('VINDI')),
    __metadata("design:paramtypes", [subscriptions_repository_1.SubscriptionsRepository,
        plans_repository_1.PlansRepository,
        find_subscription_service_1.FindSubscriptionService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], CancelSubscriptionService);
exports.CancelSubscriptionService = CancelSubscriptionService;
//# sourceMappingURL=cancel-subscription.service.js.map