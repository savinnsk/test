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
exports.MongoPaymentsConfigsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_config_1 = require("../../../../domain/entities/payment-config/payment-config");
let MongoPaymentsConfigsRepository = class MongoPaymentsConfigsRepository {
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async deleteMany({ paymentsConfigs }) {
        const ids = paymentsConfigs.map((paymentConfig) => paymentConfig.id);
        return await this.paymentModel.deleteMany({ _id: { $in: ids } });
    }
    async findById(id) {
        return this.paymentModel.findById(id);
    }
    async create({ paymentConfig, }) {
        return this.paymentModel.create(paymentConfig);
    }
    createMany({ paymentsConfigs, }) {
        return this.paymentModel.insertMany(paymentsConfigs);
    }
};
MongoPaymentsConfigsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_config_1.PaymentConfig.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoPaymentsConfigsRepository);
exports.MongoPaymentsConfigsRepository = MongoPaymentsConfigsRepository;
//# sourceMappingURL=payments-configs.repository.js.map