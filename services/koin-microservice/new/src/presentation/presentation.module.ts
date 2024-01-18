import { Module } from '@nestjs/common';
import { KoinModule } from '@infra/koin/koin.module';
import { HttpClientPort } from '@domain/ports/http.port';
import { AxiosAdapter } from '@infra/http/axios/axios.service';
import { MyHttpModule } from '@infra/http/http.module';
import messages from './messages';
import controllers from './controllers';
import { HealthModule } from '@app/health/health.module';

@Module({
  imports: [KoinModule, MyHttpModule, HealthModule],
  controllers: [...messages, ...controllers],
  providers: [
    {
      provide: HttpClientPort,
      useClass: AxiosAdapter,
    },
  ],
})
export class PresentationModule {}
