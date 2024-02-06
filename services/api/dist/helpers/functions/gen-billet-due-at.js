"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genBilletDueAt = void 0;
const genBilletDueAt = () => {
    const now = new Date();
    const threeDaysAhead = new Date(now.setDate(now.getDate() + 3));
    return threeDaysAhead.toDateString();
};
exports.genBilletDueAt = genBilletDueAt;
//# sourceMappingURL=gen-billet-due-at.js.map