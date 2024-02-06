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
exports.LoginResponseDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginResponseDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckBpbjguY29tLmJyIiwic3ViIjoiNjNjYWE3NzA2NzgxMzdmZDcwZWM5MDU1IiwiaWF0IjoxNjc0NDc0OTgxLCJleHAiOjE2NzQ1NjEzODF9.8dAqxMSX-zT2uGrsoj7suWj-JwkUMJgHO9T90nM29Nc',
        description: 'access token',
        type: 'string',
    }),
    __metadata("design:type", String)
], LoginResponseDoc.prototype, "accessToken", void 0);
exports.LoginResponseDoc = LoginResponseDoc;
//# sourceMappingURL=loginResponse.doc.js.map