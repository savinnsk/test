"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySubscriptionsRepository = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let InMemorySubscriptionsRepository = class InMemorySubscriptionsRepository {
    constructor() {
        this.subscriptions = [];
    }
    async create(_subscription) {
        const subscription = Object.assign(Object.assign({}, _subscription), { id: (0, crypto_1.randomUUID)() });
        this.subscriptions.push(subscription);
        return subscription;
    }
    async getAll(params) {
        return {
            content: this.subscriptions,
        };
    }
    async find(id) {
        const subscription = this.subscriptions.find((subscription) => subscription.id == id);
        return subscription;
    }
    async update(_subscription, id) {
        const subscription = this.subscriptions.find((subscription) => subscription.id == id);
        const subscriptionUpdated = Object.assign(Object.assign({}, subscription), _subscription);
        return subscriptionUpdated;
    }
    async partialUpdate(_subscription, id) {
        const subscription = this.subscriptions.find((subscription) => subscription.id == id);
        const subscriptionUpdated = Object.assign(Object.assign({}, subscription), _subscription);
        return subscriptionUpdated;
    }
};
InMemorySubscriptionsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemorySubscriptionsRepository);
exports.InMemorySubscriptionsRepository = InMemorySubscriptionsRepository;
//# sourceMappingURL=subscription.repository.js.map