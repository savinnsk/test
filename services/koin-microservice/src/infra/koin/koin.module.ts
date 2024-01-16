import { HttpClientPort } from '@domain/ports/http.port';
import { AxiosAdapter } from '@infra/http/axios/axios.service';
import { MyHttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import usecases from './usecases';

@Module({
  imports: [MyHttpModule],
  providers: [
    ...usecases,
    {
      provide: HttpClientPort,
      useClass: AxiosAdapter,
    },
  ],
  exports: [...usecases],
})
export class KoinModule {}
