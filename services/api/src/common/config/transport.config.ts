import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default () => {
  return [
    {
      name: 'PAGARME',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_PAGARME_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'PAGSEGURO',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_PAGSEGURO_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'PAYPAL',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_PAYPAL_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'VINDI',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_VINDI_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'MERCADOPAGO',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_MERCADOPAGO_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'KOIN',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_KOIN_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: 'BOLETOFLEX',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('MICRO_BOLETOFLEX_HOST'),
          port: configService.get<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
  ];
};
