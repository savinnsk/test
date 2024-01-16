import { FormatResponseInterceptor } from '@common/interceptors/format-response.interceptor';
import { NewrelicInterceptor } from '@common/interceptors/new-relic.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalInterceptors(new NewrelicInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Payment Hub API')
    .setDescription('API made to be a hub of payment gateways')
    .setVersion('1.0')
    .addApiKey(
      {
        name: 'x-api-key',
        type: 'apiKey',
        in: 'header',
      },
      'API key authentication',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const internalConfig = new DocumentBuilder()
    .setTitle('Payment Hub API')
    .setDescription('API made to be a hub of payment gateways')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const internalDocument = SwaggerModule.createDocument(app, internalConfig);
  SwaggerModule.setup('internal/docs', app, internalDocument);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
