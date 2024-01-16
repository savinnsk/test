import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ClientsModule } from '@app/clients/clients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@app/users/users.module';
import usecases from './usecases';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    ClientsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('jwtExpiresIn') },
      }),
    }),
  ],
  providers: [...usecases, LocalStrategy, JwtStrategy, ApiKeyStrategy],
  exports: [...usecases],
  controllers: [],
})
export class AuthModule {}
