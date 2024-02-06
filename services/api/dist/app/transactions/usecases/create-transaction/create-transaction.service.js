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
exports.CreateTransactionService = void 0;
const common_1 = require("@nestjs/common");
const status_enum_1 = require("../../enums/status.enum");
const transactions_repository_1 = require("../../repositories/transactions.repository");
const get_last_four_char_1 = require("../../../../helpers/functions/get-last-four-char");
let CreateTransactionService = class CreateTransactionService {
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async execute({ transaction, client, }) {
        try {
            const createdTransaction = await this.transactionsRepository.createInstance({
                transaction: Object.assign(Object.assign({}, transaction), { client }),
            });
            if (createdTransaction.creditCard) {
                createdTransaction.creditCard.lastFourNumbers = (0, get_last_four_char_1.getLastFourChar)(transaction.creditCard.number);
                createdTransaction.creditCard.bin =
                    transaction.creditCard.number.substring(0, 6);
            }
            createdTransaction.currentStatus = status_enum_1.TransactionStatus.created;
            createdTransaction.statusLog.push({
                old: null,
                new: status_enum_1.TransactionStatus.created,
            });
            return await createdTransaction.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
CreateTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_repository_1.TransactionsRepository])
], CreateTransactionService);
exports.CreateTransactionService = CreateTransactionService;
//# sourceMappingURL=create-transaction.service.js.map