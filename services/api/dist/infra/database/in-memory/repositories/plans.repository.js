"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPlansRepository = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let InMemoryPlansRepository = class InMemoryPlansRepository {
    constructor() {
        this.plans = [];
    }
    async create(_plan) {
        const plan = Object.assign(Object.assign({}, _plan), { id: (0, crypto_1.randomUUID)(), intervalName: 'Mensal' });
        this.plans.push(plan);
        return plan;
    }
    findByPlanId(id) {
        throw new Error('Method not implemented.');
    }
    async getAll() {
        return {
            content: this.plans,
        };
    }
    async find(id) {
        const plan = this.plans.find((plan) => plan.id == id);
        return plan;
    }
    async update(_plan, id) {
        const plan = this.plans.find((plan) => plan.id == id);
        const planUpdated = Object.assign(Object.assign({}, plan), _plan);
        return planUpdated;
    }
};
InMemoryPlansRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryPlansRepository);
exports.InMemoryPlansRepository = InMemoryPlansRepository;
//# sourceMappingURL=plans.repository.js.map