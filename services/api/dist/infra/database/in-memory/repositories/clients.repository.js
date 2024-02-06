"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryClientsRepository = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let InMemoryClientsRepository = class InMemoryClientsRepository {
    constructor() {
        this.clients = [];
    }
    async create(params) {
        var _a;
        const client = Object.assign(Object.assign({}, params.client), { id: (_a = params.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)(), createdAt: new Date(), updatedAt: new Date() });
        this.clients.push(client);
        return client;
    }
    async updateByApiKey(apiKey, params) {
        const client = this.clients.find((client) => client.apiKey === apiKey);
        if (client) {
            Object.assign(client, params.client);
        }
        return client !== null && client !== void 0 ? client : null;
    }
    async update(id, params) {
        const client = this.clients.find((client) => client.id === id);
        if (client) {
            Object.assign(client, params.client);
        }
        return client !== null && client !== void 0 ? client : null;
    }
    async findAll() {
        return this.clients;
    }
    async findById(id) {
        var _a;
        return (_a = this.clients.find((client) => client.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    async findByApiKey(apiKey) {
        var _a;
        return (_a = this.clients.find((client) => client.apiKey === apiKey)) !== null && _a !== void 0 ? _a : null;
    }
    async delete(id) {
        const current = await this.findById(id);
        this.clients = this.clients.filter((client) => client.id !== id);
        return current;
    }
};
InMemoryClientsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryClientsRepository);
exports.InMemoryClientsRepository = InMemoryClientsRepository;
//# sourceMappingURL=clients.repository.js.map