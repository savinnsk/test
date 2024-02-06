import { CurrencyQuotesPort, IConvertProps, IConvertResponse } from '@domain/ports/currency-quotes.port';
import { HttpService } from '@nestjs/axios';
export declare class AwesomeapiAdapter implements CurrencyQuotesPort {
    private readonly httpService;
    constructor(httpService: HttpService);
    convert(props: IConvertProps): Promise<IConvertResponse>;
}
