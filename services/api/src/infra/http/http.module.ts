import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AxiosAdapter } from './axios/axios.service';

@Module({
  imports: [ConfigModule],
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class MyHttpModule {}
