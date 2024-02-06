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
exports.CreateUserService = void 0;
const common_1 = require("@nestjs/common");
const hash_enum_1 = require("../../../../common/enums/hash.enum");
const hash_service_1 = require("../../../../common/hash/hash.service");
const users_repository_1 = require("../../repositories/users.repository");
let CreateUserService = class CreateUserService {
    constructor(hashService, usersRepository) {
        this.hashService = hashService;
        this.usersRepository = usersRepository;
    }
    async execute(createUserDto) {
        try {
            const hashedPassword = await this.hashService.hash(createUserDto.password, hash_enum_1.HashingAlgorithm.bcrypt);
            createUserDto.password = hashedPassword;
            return await this.usersRepository.create({ user: createUserDto });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
CreateUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hash_service_1.HashService,
        users_repository_1.UsersRepository])
], CreateUserService);
exports.CreateUserService = CreateUserService;
//# sourceMappingURL=create-user.service.js.map