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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_repository_1 = require("../../repositories/subscriptions.repository");
let GetAllSubscriptionsService = class GetAllSubscriptionsService {
    constructor(subscriptionsRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
    }
    async execute(params) {
        try {
            const subscriptions = await this.subscriptionsRepository.getAll(params);
            return subscriptions;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
GetAllSubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscriptions_repository_1.SubscriptionsRepository])
], GetAllSubscriptionsService);
exports.GetAllSubscriptionsService = GetAllSubscriptionsService;
//# sourceMappingURL=get-all-subscriptions.service.js.map