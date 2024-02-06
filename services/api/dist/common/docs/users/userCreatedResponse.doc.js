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
exports.UserCreatedDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserCreatedDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Joseph',
        description: 'Users name',
        type: 'string',
    }),
    __metadata("design:type", String)
], UserCreatedDoc.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'joseph@mail.com',
        description: 'Users email',
        type: 'string',
    }),
    __metadata("design:type", String)
], UserCreatedDoc.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the user was created',
        type: Date,
    }),
    __metadata("design:type", Date)
], UserCreatedDoc.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-18T20:58:35.053Z',
        description: 'Date when the user was updated',
        type: Date,
    }),
    __metadata("design:type", Date)
], UserCreatedDoc.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Users version',
        type: 'number',
    }),
    __metadata("design:type", Number)
], UserCreatedDoc.prototype, "__v", void 0);
exports.UserCreatedDoc = UserCreatedDoc;
//# sourceMappingURL=userCreatedResponse.doc.js.map