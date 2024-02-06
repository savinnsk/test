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
exports.AuthorizeMessage = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const order_mapper_1 = require("../../../common/mappers/order.mapper");
const authorize_transaction_service_1 = require("../../../infra/koin/usecases/billet/authorize-transaction/authorize-transaction.service");
const auth_service_1 = require("../../../infra/koin/usecases/billet/auth/auth.service");
const create_payment_service_1 = require("../../../infra/koin/usecases/card/create-payment/create-payment.service");
const credential_mapper_1 = require("../../../common/mappers/credential-mapper");
const tokenize_card_service_1 = require("../../../infra/koin/usecases/card/tokenize-card/tokenize-card.service");
let AuthorizeMessage = class AuthorizeMessage {
    constructor(tokenizeCardPaymentService, authorizeTransactionService, createCardPaymentService, authService) {
        this.tokenizeCardPaymentService = tokenizeCardPaymentService;
        this.authorizeTransactionService = authorizeTransactionService;
        this.createCardPaymentService = createCardPaymentService;
        this.authService = authService;
    }
    async execute(payload) {
        console.log('payload: ', payload);
        try {
            if (payload.data.amount < 100) {
                return {
                    status: 'failed',
                    statusCode: 400,
                    message: 'Bad Request',
                    errors: ['The amount must be greater than or equal to 100'],
                };
            }
            const credentials = credential_mapper_1.CredentialsMapper.getKeysValue(payload.config.publicKey);
            if (payload.data.paymentMethod === 'billet') {
                const formattedDataApiToKoin = order_mapper_1.OrderMapper.billetToKoin({
                    data: payload.data,
                }).data;
                const auth = await this.authService.execute({
                    url: 'https://pre-prd-sp-api.koin.com.br/Transaction/authorization',
                    consumerKey: credentials.publicKey,
                    secretKey: payload.config.key,
                });
                if ('errors' in auth) {
                    return auth;
                }
                const order = await this.authorizeTransactionService.execute({
                    data: formattedDataApiToKoin,
                    token: auth.body.Authorization,
                });
                if (order.body.code && order.body.message) {
                    return order;
                }
                if ('errors' in order) {
                    return order;
                }
                const result = order_mapper_1.OrderMapper.toApi({
                    data: order.body,
                    dto: payload.data,
                });
                return result;
            }
            const result = await this.cardPayment(payload, credentials);
            return result;
        }
        catch (err) {
            console.log("Error tn 'koin-authorize-message : ", err);
            return err;
        }
    }
    async cardPayment(payload, credentials) {
        var _a, _b;
        const creditCardPayloadFormatted = order_mapper_1.OrderMapper.tokenizeCard(payload.data.creditCard, payload.data.code);
        const creditCardToken = await this.tokenizeCardPaymentService.execute({
            data: creditCardPayloadFormatted,
            token: credentials.privateKey,
        });
        if ('errors' in creditCardToken) {
            return creditCardToken;
        }
        const formattedDataApiToKoin = order_mapper_1.OrderMapper.cardToKoin({
            data: Object.assign(payload.data, {
                koinCreditCardToken: creditCardToken.body.secure_token,
            }),
            credentials,
        }).data;
        const order = await this.createCardPaymentService.execute({
            data: formattedDataApiToKoin,
            token: credentials.privateKey,
        });
        if (((_a = order === null || order === void 0 ? void 0 : order.body) === null || _a === void 0 ? void 0 : _a.code) && ((_b = order === null || order === void 0 ? void 0 : order.body) === null || _b === void 0 ? void 0 : _b.message)) {
            order;
        }
        if ('errors' in order) {
            return order;
        }
        const result = order_mapper_1.OrderMapper.toApi({
            data: order.body,
            dto: payload.data,
        });
        console.log('Result : ', result);
        return result;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('koin-authorize'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizeMessage.prototype, "execute", null);
AuthorizeMessage = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tokenize_card_service_1.TokenizeCardPaymentService,
        authorize_transaction_service_1.AuthorizeTransactionService,
        create_payment_service_1.CreateCardPaymentService,
        auth_service_1.AuthService])
], AuthorizeMessage);
exports.AuthorizeMessage = AuthorizeMessage;
//# sourceMappingURL=authorize.message.js.map