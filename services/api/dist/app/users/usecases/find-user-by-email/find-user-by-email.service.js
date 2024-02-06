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
exports.FindUserByEmailService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../../repositories/users.repository");
let FindUserByEmailService = class FindUserByEmailService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(email) {
        try {
            const user = await this.usersRepository.findByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
FindUserByEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], FindUserByEmailService);
exports.FindUserByEmailService = FindUserByEmailService;
//# sourceMappingURL=find-user-by-email.service.js.map