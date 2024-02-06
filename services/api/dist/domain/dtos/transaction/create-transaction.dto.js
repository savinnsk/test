"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionDto = void 0;
const openapi = require("@nestjs/swagger");
const authorize_dto_1 = require("../authorize.dto");
class CreateTransactionDto extends authorize_dto_1.AuthorizeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.CreateTransactionDto = CreateTransactionDto;
//# sourceMappingURL=create-transaction.dto.js.map