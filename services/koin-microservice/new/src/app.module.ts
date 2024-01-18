import koinConfig from '@common/config/koin.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [koinConfig],
    }),
    PresentationModule,
  ],
})
export class AppModule {}
