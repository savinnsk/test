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
exports.MongoPlansRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const plan_schema_1 = require("../../../../domain/entities/plan/plan.schema");
let MongoPlansRepository = class MongoPlansRepository {
    constructor(planModel) {
        this.planModel = planModel;
    }
    async findByPlanId(id) {
        try {
            const plan = await this.planModel.findOne({ planId: id });
            return plan;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async create(plan) {
        try {
            const planCreated = await this.planModel.create(plan);
            return planCreated;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getAll(params) {
        try {
            const total = await this.planModel.countDocuments();
            if (!params.page) {
                params.limit = total;
                params.page = 1;
            }
            const plans = await this.planModel
                .find({ 'client.apiKey': params.user.apiKey })
                .limit(params.limit * 1)
                .skip((params.page - 1) * params.limit)
                .exec();
            return {
                content: plans,
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
            const plan = await this.planModel.findById(id);
            return plan;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update(data, id) {
        try {
            const planUpdated = await this.planModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return planUpdated;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
MongoPlansRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(plan_schema_1.Plan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoPlansRepository);
exports.MongoPlansRepository = MongoPlansRepository;
//# sourceMappingURL=plans.repository.js.map