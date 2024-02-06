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
exports.MongoTransactionsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("../../../../domain/entities/transaction/transaction.schema");
let MongoTransactionsRepository = class MongoTransactionsRepository {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async update(params) {
        return this.transactionModel.findByIdAndUpdate(params.id, params.data);
    }
    async updateBilletByTransactionId(params) {
        await this.transactionModel
            .updateOne({ transactionId: params.transactionId }, {
            $set: { billet: params.billet },
        })
            .exec();
    }
    async updatePixQrByTransactionId(params) {
        await this.transactionModel
            .updateOne({ transactionId: params.transactionId }, {
            $set: { pix: params.pix },
        })
            .exec();
    }
    async updateMetadata(params) {
        return await this.transactionModel
            .updateOne({ transactionId: params.transactionId }, {
            $set: { metadata: params.metadata },
        })
            .exec();
    }
    async create(params) {
        return await this.transactionModel.create(params.transaction);
    }
    async createInstance(params) {
        return new this.transactionModel(Object.assign({}, params.transaction));
    }
    async findAll(params) {
        const total = await this.transactionModel.countDocuments();
        if (!params.page) {
            params.limit = total;
            params.page = 1;
        }
        const transactions = await this.transactionModel
            .find()
            .limit(params.limit * 1)
            .skip((params.page - 1) * params.limit)
            .exec();
        return {
            content: transactions,
            total_items: total,
            page: params.page,
        };
    }
    async findById(id) {
        return await this.transactionModel.findById(id).populate('client').exec();
    }
    async findByClient(client) {
        return await this.transactionModel.find({ client }).exec();
    }
    async findByTransactionId(params) {
        return await this.transactionModel
            .findOne({ transactionId: params.transactionId })
            .exec();
    }
    async findByPaymentGateway(params) {
        return await this.transactionModel
            .findOne({
            paymentGateway: params.paymentGateway,
            transactionId: params.transactionId,
        })
            .exec();
    }
    async updateTransactionId(params) {
        return await this.transactionModel
            .findByIdAndUpdate(params.id, {
            transactionId: params.transactionId,
        })
            .exec();
    }
    async updateStatus(params) {
        return await this.transactionModel
            .findByIdAndUpdate(params.id, {
            status: params.status,
        })
            .exec();
    }
};
MongoTransactionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoTransactionsRepository);
exports.MongoTransactionsRepository = MongoTransactionsRepository;
//# sourceMappingURL=transactions.repository.js.map