"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_response_interceptor_1 = require("./common/interceptors/format-response.interceptor");
const new_relic_interceptor_1 = require("./common/interceptors/new-relic.interceptor");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidUnknownValues: false,
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalInterceptors(new format_response_interceptor_1.FormatResponseInterceptor());
    app.useGlobalInterceptors(new new_relic_interceptor_1.NewrelicInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Payment Hub API')
        .setDescription('API made to be a hub of payment gateways')
        .setVersion('1.0')
        .addApiKey({
        name: 'x-api-key',
        type: 'apiKey',
        in: 'header',
    }, 'API key authentication')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const internalConfig = new swagger_1.DocumentBuilder()
        .setTitle('Payment Hub API')
        .setDescription('API made to be a hub of payment gateways')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const internalDocument = swagger_1.SwaggerModule.createDocument(app, internalConfig);
    swagger_1.SwaggerModule.setup('internal/docs', app, internalDocument);
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map