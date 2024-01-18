import { Module } from '@nestjs/common';
import usecases from './usecases';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [...usecases],
  exports: [...usecases],
})
export class HealthModule {}
