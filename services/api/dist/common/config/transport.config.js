"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
exports.default = () => {
    return [
        {
            name: 'PAGARME',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_PAGARME_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'PAGSEGURO',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_PAGSEGURO_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'PAYPAL',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_PAYPAL_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'VINDI',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_VINDI_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'MERCADOPAGO',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_MERCADOPAGO_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'KOIN',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_KOIN_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
        {
            name: 'BOLETOFLEX',
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: configService.get('MICRO_BOLETOFLEX_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [config_1.ConfigService],
        },
    ];
};
//# sourceMappingURL=transport.config.js.map