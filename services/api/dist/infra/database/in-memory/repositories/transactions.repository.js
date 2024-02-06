"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTransactionsRepository = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let InMemoryTransactionsRepository = class InMemoryTransactionsRepository {
    constructor() {
        this.transactions = [];
    }
    async update(params) {
        const currentTransaction = this.transactions.find((x) => x.id === params.id);
        if (!currentTransaction)
            return null;
        Object.assign(currentTransaction, Object.assign({}, params.data));
        delete currentTransaction.save;
        delete currentTransaction.createdAt;
        delete currentTransaction.updatedAt;
        return currentTransaction;
    }
    async updateBilletByTransactionId(params) {
        const currentTransaction = this.transactions.find((x) => x.transactionId === params.transactionId);
        Object.assign(currentTransaction, { billet: params.billet });
    }
    async updatePixQrByTransactionId(params) {
        const currentTransaction = this.transactions.find((x) => x.transactionId === params.transactionId);
        Object.assign(currentTransaction, { pix: params.pix });
    }
    async updateMetadata(params) {
        const currentTransaction = this.transactions.find((x) => x.transactionId === params.transactionId);
        Object.assign(currentTransaction, { metadata: params.metadata });
    }
    async create(params) {
        var _a;
        const transaction = Object.assign({ id: (_a = params.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)(), createdAt: new Date(), updatedAt: new Date(), statusLog: [], save: function () {
                delete this.save;
                return this;
            } }, params.transaction);
        this.transactions.push(transaction);
        return transaction;
    }
    async createInstance(params) {
        const transaction = Object.assign(Object.assign({}, params.transaction), { id: (0, crypto_1.randomUUID)(), statusLog: [], createdAt: new Date(), updatedAt: new Date(), save: function () {
                delete this.save;
                return this;
            } });
        return transaction;
    }
    async findAll() {
        return {
            content: this.transactions,
        };
    }
    async findById(id) {
        var _a;
        return ((_a = this.transactions.find((transaction) => transaction.id === id)) !== null && _a !== void 0 ? _a : null);
    }
    async findByClient(client) {
        return this.transactions.filter((transaction) => transaction.client._id.toString() === client);
    }
    async findByTransactionId(params) {
        var _a;
        return ((_a = this.transactions.find((transaction) => transaction.transactionId === params.transactionId)) !== null && _a !== void 0 ? _a : null);
    }
    async findByPaymentGateway(params) {
        var _a;
        return ((_a = this.transactions.find((transaction) => transaction.transactionId === params.transactionId &&
            transaction.paymentGateway === params.paymentGateway)) !== null && _a !== void 0 ? _a : null);
    }
    async updateTransactionId(params) {
        const currentTransaction = this.transactions.find((x) => x.id === params.id);
        Object.assign(currentTransaction, { transactionId: params.transactionId });
        return currentTransaction;
    }
    async updateStatus(params) {
        const currentTransaction = this.transactions.find((x) => x.id === params.id);
        Object.assign(currentTransaction, { status: params.status });
        return currentTransaction;
    }
};
InMemoryTransactionsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryTransactionsRepository);
exports.InMemoryTransactionsRepository = InMemoryTransactionsRepository;
//# sourceMappingURL=transactions.repository.js.map