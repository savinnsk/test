import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { PaymentsService } from '@app/payments/payments.service';

@Controller('payments/webhook')
export class PaymentWebHookController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async parse(@Body() payload: any) {
    const result = await this.paymentsService.parseToApi(payload);
    console.log('API PARSE RESULT ', result);
    try {
      await firstValueFrom(this.httpService.post(result.callbackUrl, result));
    } catch (error) {
      throw new InternalServerErrorException(
        "Can't send the response for('url'): " + result.callbackUrl,
      );
    }
    return result;
  }
}
