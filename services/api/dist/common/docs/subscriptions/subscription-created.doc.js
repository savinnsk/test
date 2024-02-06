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
exports.SubscriptionCreatedDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_subscription_doc_1 = require("./create-subscription.doc");
class SubscriptionCreatedDoc extends create_subscription_doc_1.CreateSubscriptionDoc {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456543',
        description: 'Subscription id in microservice',
        type: 'string',
    }),
    __metadata("design:type", String)
], SubscriptionCreatedDoc.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-05T20:58:35.053Z',
        description: 'Date when the subscription was created',
        type: Date,
    }),
    __metadata("design:type", Date)
], SubscriptionCreatedDoc.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-07-05T20:58:35.053Z',
        description: 'Date when the subscription was updated',
        type: Date,
    }),
    __metadata("design:type", Date)
], SubscriptionCreatedDoc.prototype, "updatedAt", void 0);
exports.SubscriptionCreatedDoc = SubscriptionCreatedDoc;
//# sourceMappingURL=subscription-created.doc.js.map