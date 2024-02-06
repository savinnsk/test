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
exports.CreatePlanService = void 0;
const common_1 = require("@nestjs/common");
const plans_repository_1 = require("../../repositories/plans.repository");
const create_product_service_1 = require("../../../products/usecases/create-product/create-product.service");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const respose_is_error_type_1 = require("../../../../helpers/functions/respose-is-error-type");
let CreatePlanService = class CreatePlanService {
    constructor(plansRepository, createProductService, pagseguroClient, paypalClient, pagarmeClient, mercadopagoClient, vindiClient) {
        this.plansRepository = plansRepository;
        this.createProductService = createProductService;
        this.pagseguroClient = pagseguroClient;
        this.paypalClient = paypalClient;
        this.pagarmeClient = pagarmeClient;
        this.mercadopagoClient = mercadopagoClient;
        this.vindiClient = vindiClient;
    }
    async execute(plan, client) {
        try {
            const { paymentGateway } = plan;
            const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, paymentGateway);
            const data = await this.send(paymentGateway, 'create-plan', {
                data: plan,
                config: currentPaymentConfig,
            });
            if ((0, respose_is_error_type_1.responseIsAErrorType)(data)) {
                return data;
            }
            if (!data.planId) {
                throw new common_1.BadGatewayException('Error in plan creation');
            }
            const { product } = data;
            const productCreated = await this.createProductService.execute(product);
            data.productId = productCreated.id;
            const planCreated = await this.plansRepository.create(Object.assign(Object.assign({}, data), { client }));
            if (!planCreated) {
                throw new common_1.BadRequestException('Plan cant be created.');
            }
            return planCreated;
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
CreatePlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('PAGSEGURO')),
    __param(3, (0, common_1.Inject)('PAYPAL')),
    __param(4, (0, common_1.Inject)('PAGARME')),
    __param(5, (0, common_1.Inject)('MERCADOPAGO')),
    __param(6, (0, common_1.Inject)('VINDI')),
    __metadata("design:paramtypes", [plans_repository_1.PlansRepository,
        create_product_service_1.CreateProductService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], CreatePlanService);
exports.CreatePlanService = CreatePlanService;
//# sourceMappingURL=create-plan.service.js.map