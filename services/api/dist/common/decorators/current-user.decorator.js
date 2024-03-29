"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
function makeCurrentUserDecorator(data, ctx) {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
}
exports.CurrentUser = (0, common_1.createParamDecorator)(makeCurrentUserDecorator);
//# sourceMappingURL=current-user.decorator.js.map