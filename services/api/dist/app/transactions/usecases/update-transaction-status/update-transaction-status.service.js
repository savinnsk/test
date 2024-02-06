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
exports.UpdateTransactionStatusService = void 0;
const common_1 = require("@nestjs/common");
const find_transaction_by_id_service_1 = require("../find-transaction-by-id/find-transaction-by-id.service");
let UpdateTransactionStatusService = class UpdateTransactionStatusService {
    constructor(findTransactionByIdService) {
        this.findTransactionByIdService = findTransactionByIdService;
    }
    async execute(id, newStatus) {
        try {
            const transaction = await this.findTransactionByIdService.execute(id);
            const oldStatus = transaction.currentStatus;
            transaction.currentStatus = newStatus;
            transaction.statusLog.push({
                old: oldStatus,
                new: newStatus,
            });
            return await transaction.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
UpdateTransactionStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [find_transaction_by_id_service_1.FindTransactionByIdService])
], UpdateTransactionStatusService);
exports.UpdateTransactionStatusService = UpdateTransactionStatusService;
//# sourceMappingURL=update-transaction-status.service.js.map