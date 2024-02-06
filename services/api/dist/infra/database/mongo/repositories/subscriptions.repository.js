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
exports.MongoSubscriptionsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_schema_1 = require("../../../../domain/entities/subscription/subscription.schema");
let MongoSubscriptionsRepository = class MongoSubscriptionsRepository {
    constructor(subscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }
    async create(subscription) {
        try {
            const subscriptionCreated = await this.subscriptionModel.create(subscription);
            return subscriptionCreated;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getAll(params) {
        try {
            const query = this.subscriptionModel.find();
            if (params.payerName) {
                query.where('payer.firstName', new RegExp(params.payerName, 'i'));
            }
            const total = await this.subscriptionModel.countDocuments();
            if (!params.page) {
                params.limit = total;
                params.page = 1;
            }
            const subscriptions = await query
                .find({ 'associatedPlan.client.apiKey': params.user.apiKey })
                .limit(params.limit * 1)
                .skip((params.page - 1) * params.limit)
                .exec();
            return {
                content: subscriptions,
                total_items: total,
                page: params.page,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async find(id) {
        try {
            const where = [{ subscriptionId: id }];
            if ((0, mongoose_2.isValidObjectId)(id)) {
                where.push({ _id: id });
            }
            const subscription = await this.subscriptionModel.findOne({
                $or: [...where],
            });
            return subscription;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update(data, id) {
        try {
            const subscription = await this.find(id);
            await subscription.updateOne(data).exec();
            const subscriptionUpdated = await this.find(id);
            return subscriptionUpdated;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async partialUpdate(data, id) {
        try {
            const subscription = await this.subscriptionModel
                .findByIdAndUpdate(id, Object.assign({}, data), {
                new: true,
            })
                .exec();
            return subscription;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
MongoSubscriptionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_schema_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoSubscriptionsRepository);
exports.MongoSubscriptionsRepository = MongoSubscriptionsRepository;
//# sourceMappingURL=subscriptions.repository.js.map