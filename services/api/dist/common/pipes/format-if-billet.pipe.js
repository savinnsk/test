"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatIfBilletPipe = void 0;
const gen_billet_due_at_1 = require("../../helpers/functions/gen-billet-due-at");
const common_1 = require("@nestjs/common");
let FormatIfBilletPipe = class FormatIfBilletPipe {
    transform(value, metadata) {
        const isBillet = (value === null || value === void 0 ? void 0 : value.paymentMethod) === 'billet';
        console.log((0, gen_billet_due_at_1.genBilletDueAt)());
        if (!isBillet)
            return value;
        return Object.assign(value, {
            billet: {
                due_at: (0, gen_billet_due_at_1.genBilletDueAt)(),
                instructions: 'Pagar até vencimento: ' + (0, gen_billet_due_at_1.genBilletDueAt)(),
                interest: {
                    days: 4,
                    type: 'percentage',
                    amount: '10',
                },
                fine: {
                    days: 4,
                    type: 'percentage',
                    amount: '10',
                },
            },
        });
    }
};
FormatIfBilletPipe = __decorate([
    (0, common_1.Injectable)()
], FormatIfBilletPipe);
exports.FormatIfBilletPipe = FormatIfBilletPipe;
//# sourceMappingURL=format-if-billet.pipe.js.map