import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import transportConfig from '@common/config/transport.config';
import { HttpModule } from '@nestjs/axios';
import usecases from './usecases';

@Module({
  imports: [ClientsModule.registerAsync(transportConfig() as any), HttpModule],
  providers: [...usecases],
  exports: [...usecases],
})
export class PublicKeysModule {}
