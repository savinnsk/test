"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let InMemoryUsersRepository = class InMemoryUsersRepository {
    constructor() {
        this.users = [];
    }
    async create(params) {
        var _a;
        const user = Object.assign(Object.assign({}, params.user), { id: (_a = params.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)(), createdAt: new Date(), updatedAt: new Date() });
        this.users.push(user);
        return user;
    }
    async findAll() {
        return {
            content: this.users,
        };
    }
    async findById(id) {
        return this.users.find((user) => user.id === id);
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
};
InMemoryUsersRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryUsersRepository);
exports.InMemoryUsersRepository = InMemoryUsersRepository;
//# sourceMappingURL=users.repository.js.map