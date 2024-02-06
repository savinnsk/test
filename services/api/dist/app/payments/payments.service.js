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
exports.PaymentsService = void 0;
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const status_enum_1 = require("../transactions/enums/status.enum");
const create_transaction_service_1 = require("../transactions/usecases/create-transaction/create-transaction.service");
const update_transaction_id_service_1 = require("../transactions/usecases/update-transaction-id/update-transaction-id.service");
const update_transaction_status_service_1 = require("../transactions/usecases/update-transaction-status/update-transaction-status.service");
const find_transaction_by_id_service_1 = require("../transactions/usecases/find-transaction-by-id/find-transaction-by-id.service");
const update_billet_by_transaction_id_service_1 = require("../transactions/usecases/update-billet-by-transaction-id/update-billet-by-transaction-id.service");
const update_pix_qr_by_transaction_id_service_1 = require("../transactions/usecases/update-pix-qr-by-transaction-id/update-pix-qr-by-transaction-id.service");
const update_metadata_service_1 = require("../transactions/usecases/update-metadata/update-metadata.service");
const currency_quotes_port_1 = require("../../domain/ports/currency-quotes.port");
const find_transaction_by_transaction_id_service_1 = require("../transactions/usecases/find-transaction-by-transaction-id/find-transaction-by-transaction-id.service");
const update_transaction_service_1 = require("../transactions/usecases/update-transaction/update-transaction.service");
let PaymentsService = class PaymentsService {
    constructor(createTransactionService, findTransactionByIdService, findTransactionByTransactionIdService, updateTransactionIdService, updateMetadataService, updateTransactionStatusService, updateTransactionService, updatePixQrByTransactionIdService, updateBilletByTransactionIdService, currencyQuotesService, pagseguroClient, paypalClient, pagarmeClient, mercadopagoClient, koinClient, vindiClient) {
        this.createTransactionService = createTransactionService;
        this.findTransactionByIdService = findTransactionByIdService;
        this.findTransactionByTransactionIdService = findTransactionByTransactionIdService;
        this.updateTransactionIdService = updateTransactionIdService;
        this.updateMetadataService = updateMetadataService;
        this.updateTransactionStatusService = updateTransactionStatusService;
        this.updateTransactionService = updateTransactionService;
        this.updatePixQrByTransactionIdService = updatePixQrByTransactionIdService;
        this.updateBilletByTransactionIdService = updateBilletByTransactionIdService;
        this.currencyQuotesService = currencyQuotesService;
        this.pagseguroClient = pagseguroClient;
        this.paypalClient = paypalClient;
        this.pagarmeClient = pagarmeClient;
        this.mercadopagoClient = mercadopagoClient;
        this.koinClient = koinClient;
        this.vindiClient = vindiClient;
    }
    async client(paymentGateway) {
        return this.getPaymentGatewayClient(paymentGateway).send({ cmd: 'get_client_needs' }, { teste: 'a' });
    }
    async getInstallments() {
        return [];
    }
    async authorize(authorizeDto, client) {
        var _a;
        console.log('Initializing authorization business logic');
        const doesCurrencyIsBRL = authorizeDto.currency === 'BRL';
        if (!doesCurrencyIsBRL) {
            const currencyQuotes = await this.currencyQuotesService.convert({
                from: authorizeDto.currency,
                to: 'BRL',
                value: authorizeDto.amount,
            });
            Object.assign(authorizeDto, {
                currency: 'BRL',
                amount: Number(Number(currencyQuotes.exchange).toFixed(2)),
                exchange: {
                    from: currencyQuotes.from,
                    to: currencyQuotes.to,
                    value: currencyQuotes.initialValue,
                    quotation: currencyQuotes.quotation,
                },
            });
        }
        const transaction = await this.createTransactionService.execute({
            transaction: authorizeDto,
            client,
        });
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, authorizeDto.paymentGateway);
        const authorizedTransaction = await this.send(authorizeDto.paymentGateway, 'authorize', {
            data: authorizeDto,
            config: currentPaymentConfig,
            apiId: transaction.id,
        });
        if (this.microReturnWrongResponse(authorizedTransaction)) {
            return authorizedTransaction;
        }
        await this.updateTransactionService.execute(transaction._id.toString(), {
            transactionId: (_a = authorizedTransaction.data) === null || _a === void 0 ? void 0 : _a.transactionId,
            installmentOptions: authorizedTransaction.data.installmentOptions,
        });
        return await this.updateTransactionStatusService.execute(transaction._id.toString(), status_enum_1.TransactionStatus.authorized);
    }
    async refund(refundDto, client) {
        const currentTransaction = await this.findTransactionByIdService.execute(refundDto.transactionId);
        if (!currentTransaction ||
            `${currentTransaction.client._id}` !== `${client._id}`) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, currentTransaction.paymentGateway);
        const refundedTransaction = await this.send(currentTransaction.paymentGateway, 'refund', {
            data: {
                transactionId: currentTransaction.transactionId,
                metadata: currentTransaction.metadata,
            },
            config: currentPaymentConfig,
        });
        if (this.microReturnWrongResponse(refundedTransaction)) {
            return refundedTransaction;
        }
        const metadata = Object.assign(Object.assign({}, currentTransaction.metadata), { refundId: refundedTransaction.data.id });
        await this.updateMetadataService.execute(currentTransaction.transactionId.toString(), metadata);
        return await this.updateTransactionStatusService.execute(currentTransaction._id.toString(), status_enum_1.TransactionStatus.refunded);
    }
    microReturnWrongResponse(response) {
        return (((response === null || response === void 0 ? void 0 : response.statusCode) && (response === null || response === void 0 ? void 0 : response.statusCode) > 399) ||
            (response === null || response === void 0 ? void 0 : response.status) === 'failed');
    }
    async capture(captureDto, client) {
        const transaction = await this.findTransactionByIdService.execute(captureDto.transactionId);
        if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, transaction.paymentGateway);
        const capturedTransaction = await this.send(transaction.paymentGateway, 'capture', {
            data: transaction,
            config: currentPaymentConfig,
            apiId: transaction.id,
        });
        console.log('capturedTransaction', capturedTransaction);
        if (this.microReturnWrongResponse(capturedTransaction)) {
            return capturedTransaction;
        }
        await this.updateTransactionIdService.execute(transaction._id.toString(), capturedTransaction.data.transactionId);
        await this.updateTransactionIdService.execute(transaction._id.toString(), capturedTransaction.data.transactionId);
        const metadata = { captureId: capturedTransaction.data.id };
        await this.updateMetadataService.execute(transaction.transactionId.toString(), metadata);
        return await this.updateTransactionStatusService.execute(transaction._id.toString(), status_enum_1.TransactionStatus.captured);
    }
    async captureInstallment(captureInstallmentDto, client) {
        const transaction = await this.findTransactionByIdService.execute(captureInstallmentDto.id);
        transaction.transactionId = captureInstallmentDto.installmentOptionId;
        console.log('captureInstallmentDto', captureInstallmentDto);
        if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, transaction.paymentGateway);
        const capturedTransaction = await this.send(transaction.paymentGateway, 'capture', {
            data: transaction,
            config: currentPaymentConfig,
            apiId: transaction.id,
        });
        if (this.microReturnWrongResponse(capturedTransaction)) {
            return capturedTransaction;
        }
        await this.updateTransactionIdService.execute(transaction._id.toString(), capturedTransaction.data.transactionId);
        const metadata = {
            installmentOptionId: captureInstallmentDto.installmentOptionId,
            statusKoin: capturedTransaction.data.statusKoin,
        };
        await this.updateMetadataService.execute(capturedTransaction.data.transactionId.toString(), metadata);
        return await this.updateTransactionStatusService.execute(transaction._id.toString(), status_enum_1.TransactionStatus.captured);
    }
    async make(authorizeDto, client) {
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, authorizeDto.paymentGateway);
        if (authorizeDto.paymentMethod === 'billet') {
            const response = await this.authorize(authorizeDto, client);
            if (this.microReturnWrongResponse(response)) {
                return response;
            }
            const responseTransaction = await this.send(authorizeDto.paymentGateway, 'get_transaction', {
                data: {
                    id: response.transactionId,
                    paymentMethod: response.paymentMethod,
                },
                config: currentPaymentConfig,
            });
            await this.updateBilletByTransactionIdService.execute(responseTransaction.data.transactionId, responseTransaction.data.billet);
            return responseTransaction;
        }
        if (authorizeDto.paymentMethod === 'pix') {
            const response = await this.authorize(authorizeDto, client);
            if (this.microReturnWrongResponse(response)) {
                return response;
            }
            const responseTransaction = await this.send(authorizeDto.paymentGateway, 'get_transaction', {
                data: {
                    id: response.transactionId,
                    paymentMethod: response.paymentMethod,
                },
                config: currentPaymentConfig,
            });
            await this.updatePixQrByTransactionIdService.execute(responseTransaction.data.transactionId, responseTransaction.data.pix);
            return responseTransaction;
        }
    }
    async get(transactionId, client) {
        const transaction = await this.findTransactionByIdService.execute(transactionId);
        if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        const currentPaymentConfig = this.getGatewayKey(client.paymentsConfigs, transaction.paymentGateway);
        const responseTransaction = await this.send(transaction.paymentGateway, 'get_transaction', {
            data: { id: transaction.transactionId },
            config: currentPaymentConfig,
        });
        return responseTransaction.data;
    }
    async parseToApi(gatewayData) {
        var _a, _b, _c;
        console.log('API PARSE SERVICE');
        let id;
        let transaction;
        if (gatewayData.reference) {
            id = (_a = gatewayData.reference) !== null && _a !== void 0 ? _a : (_c = (_b = gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.data) === null || _b === void 0 ? void 0 : _b.charges[0]) === null || _c === void 0 ? void 0 : _c.id;
            transaction = await this.findTransactionByIdService.execute(id);
        }
        else {
            id = this.getId(gatewayData);
            transaction = await this.findTransactionByTransactionIdService.execute(id);
        }
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found. with ' + id);
        }
        const { paymentGateway } = transaction;
        const currentStatus = transaction.currentStatus;
        const status = await this.send(paymentGateway, 'to-api', { data: gatewayData, currentStatus });
        if (status == transaction.currentStatus) {
            return transaction;
        }
        await this.updateTransactionStatusService.execute(transaction._id.toString(), status);
        return ((await this.findTransactionByTransactionIdService.execute(id)) ||
            (await this.findTransactionByIdService.execute(id)));
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
    getId(_data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (_data.charges) {
            return _data.charges[0].id;
        }
        if ((_a = _data === null || _data === void 0 ? void 0 : _data.data) === null || _a === void 0 ? void 0 : _a.charges) {
            return (_b = _data === null || _data === void 0 ? void 0 : _data.data) === null || _b === void 0 ? void 0 : _b.charges[0].id;
        }
        if (_data.event) {
            return ((_c = _data.event.data.charge) === null || _c === void 0 ? void 0 : _c.id)
                ? (_d = _data.event.data.charge) === null || _d === void 0 ? void 0 : _d.id
                : ((_e = _data.event.data) === null || _e === void 0 ? void 0 : _e.bill)
                    ? (_g = (_f = _data.event.data) === null || _f === void 0 ? void 0 : _f.bill) === null || _g === void 0 ? void 0 : _g.id
                    : (_j = (_h = _data.event.data) === null || _h === void 0 ? void 0 : _h.period) === null || _j === void 0 ? void 0 : _j.id;
        }
        return _data.data.id;
    }
};
PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(10, (0, common_1.Inject)('PAGSEGURO')),
    __param(11, (0, common_1.Inject)('PAYPAL')),
    __param(12, (0, common_1.Inject)('PAGARME')),
    __param(13, (0, common_1.Inject)('MERCADOPAGO')),
    __param(14, (0, common_1.Inject)('KOIN')),
    __param(15, (0, common_1.Inject)('VINDI')),
    __metadata("design:paramtypes", [create_transaction_service_1.CreateTransactionService,
        find_transaction_by_id_service_1.FindTransactionByIdService,
        find_transaction_by_transaction_id_service_1.FindTransactionByTransactionIdService,
        update_transaction_id_service_1.UpdateTransactionIdService,
        update_metadata_service_1.UpdateMetadataService,
        update_transaction_status_service_1.UpdateTransactionStatusService,
        update_transaction_service_1.UpdateTransactionService,
        update_pix_qr_by_transaction_id_service_1.UpdatePixQrByTransactionIdService,
        update_billet_by_transaction_id_service_1.UpdateBilletByTransactionIdService,
        currency_quotes_port_1.CurrencyQuotesPort,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map