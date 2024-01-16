import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import usecases from './usecases';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TerminusModule, HttpModule],
  providers: [...usecases],
  exports: [...usecases],
})
export class HealthModule {}
