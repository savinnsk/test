import {
  CurrencyQuotesPort,
  IConvertProps,
  IConvertResponse,
} from '@domain/ports/currency-quotes.port';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AwesomeapiAdapter implements CurrencyQuotesPort {
  constructor(private readonly httpService: HttpService) {}

  async convert(props: IConvertProps): Promise<IConvertResponse> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://economia.awesomeapi.com.br/last/${props.from}-${props.to}`,
      ),
    );

    const quotation = response.data[`${props.from}${props.to}`].ask;
    const conversion = props.value * quotation;

    const exchange = {
      from: props.from,
      to: props.to,
      initialValue: props.value,
      quotation: Number(Number(quotation).toFixed(2)),
      exchange: Number(conversion.toFixed(2)),
    };

    return exchange;
  }
}
