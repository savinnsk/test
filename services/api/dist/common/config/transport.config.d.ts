import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
declare const _default: () => {
    name: string;
    imports: (typeof ConfigModule)[];
    useFactory: (configService: ConfigService) => Promise<{
        transport: Transport;
        options: {
            host: string;
            port: string;
        };
    }>;
    inject: (typeof ConfigService)[];
}[];
export default _default;
