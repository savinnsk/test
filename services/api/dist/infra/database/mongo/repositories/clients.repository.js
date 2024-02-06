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
exports.MongoClientsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("../../../../domain/entities/client/client.schema");
let MongoClientsRepository = class MongoClientsRepository {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async create(params) {
        return await this.clientModel.create(params.client);
    }
    async updateByApiKey(apiKey, params) {
        return await this.clientModel
            .findOneAndUpdate({ apiKey }, Object.assign({}, params.client), { new: true })
            .populate('paymentsConfigs')
            .exec();
    }
    async update(id, params) {
        return await this.clientModel
            .findByIdAndUpdate(id, Object.assign({}, params.client), { new: true })
            .exec();
    }
    async findAll(params) {
        const total = await this.clientModel.countDocuments();
        if (!params.page) {
            params.limit = total;
            params.page = 1;
        }
        console.log('limit', params.limit);
        const clients = await this.clientModel
            .find()
            .limit(params.limit * 1)
            .skip((params.page - 1) * params.limit)
            .populate('paymentsConfigs')
            .exec();
        return {
            content: clients,
            total_items: total,
            page: params.page,
        };
    }
    async findById(id) {
        return await this.clientModel
            .findById(id)
            .populate('paymentsConfigs')
            .exec();
    }
    async findByApiKey(apiKey) {
        return await this.clientModel
            .findOne({ apiKey })
            .populate('paymentsConfigs')
            .exec();
    }
    async delete(id) {
        return await this.clientModel.findByIdAndDelete({ id }).exec();
    }
};
MongoClientsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoClientsRepository);
exports.MongoClientsRepository = MongoClientsRepository;
//# sourceMappingURL=clients.repository.js.map