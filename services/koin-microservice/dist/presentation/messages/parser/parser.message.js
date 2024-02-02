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
exports.ParserMessage = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const handler_error_1 = require("../../../common/formatters/handler-error");
const parser_mapper_1 = require("../../../common/mappers/parser.mapper");
let ParserMessage = class ParserMessage {
    async execute(payload) {
        try {
            return parser_mapper_1.ParserMapper.toApi(payload);
        }
        catch (err) {
            console.log(err);
            return handler_error_1.HandlerError.makeError(err);
        }
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('koin-to-api'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParserMessage.prototype, "execute", null);
ParserMessage = __decorate([
    (0, common_1.Controller)()
], ParserMessage);
exports.ParserMessage = ParserMessage;
//# sourceMappingURL=parser.message.js.map