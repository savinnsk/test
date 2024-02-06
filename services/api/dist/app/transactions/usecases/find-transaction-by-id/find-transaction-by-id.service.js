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
exports.FindTransactionByIdService = void 0;
const common_1 = require("@nestjs/common");
const transactions_repository_1 = require("../../repositories/transactions.repository");
let FindTransactionByIdService = class FindTransactionByIdService {
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async execute(id) {
        try {
            return await this.transactionsRepository.findById(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
FindTransactionByIdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_repository_1.TransactionsRepository])
], FindTransactionByIdService);
exports.FindTransactionByIdService = FindTransactionByIdService;
//# sourceMappingURL=find-transaction-by-id.service.js.map