"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const api_key_strategy_1 = require("./strategies/api-key.strategy");
const clients_module_1 = require("../clients/clients.module");
const config_1 = require("@nestjs/config");
const users_module_1 = require("../users/users.module");
const usecases_1 = require("./usecases");
const common_module_1 = require("../../common/common.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('jwtSecret'),
                    signOptions: { expiresIn: configService.get('jwtExpiresIn') },
                }),
            }),
        ],
        providers: [...usecases_1.default, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, api_key_strategy_1.ApiKeyStrategy],
        exports: [...usecases_1.default],
        controllers: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map