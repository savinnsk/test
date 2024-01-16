import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiKeyAuthGuard } from '@app/auth/guards/api-key-auth.guard';
import { TransactionResponseDto } from '@domain/dtos/transaction-response.dto';
import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';
import { PaymentsService } from '@app/payments/payments.service';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Client } from '@domain/entities/client/client.schema';
import { PaymentAuthorizeRequestDoc, TransactionsInfosDoc } from '@common/docs';
import { RefundDto } from '@domain/dtos/refund.dto';
import { FormatIfBilletPipe } from '@common/pipes/format-if-billet.pipe';
import { PaymentMakeRequestDoc } from '@common/docs/payments/paymentMakeRequest.doc';
import { CaptureInstallmentDto } from '@domain/dtos/capture-installment.dto';

@UseGuards(ApiKeyAuthGuard)
@ApiTags('payments')
@ApiSecurity('API key authentication')
@Controller('payments')
@ApiUnauthorizedResponse({
  description: 'API key is missing or invalid',
})
@ApiBadRequestResponse({
  description: 'Validation failed',
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/client')
  async client(@Query('payment-gateway') paymentGateway: PaymentGateway) {
    return await this.paymentsService.client(paymentGateway);
  }

  @Get('/installments')
  async getInstallments() {
    return await this.paymentsService.getInstallments();
  }

  @ApiBody({
    type: PaymentAuthorizeRequestDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created transaction and integrated to gateway',
    type: TransactionsInfosDoc,
  })
  @ApiNotFoundResponse({
    description: 'Transaction not found for capturing',
  })
  @Post('/authorize')
  @HttpCode(HttpStatus.OK)
  async authorize(
    @Body(FormatIfBilletPipe)
    authorizeDto: AuthorizeDto,
    @CurrentUser() user: Client,
  ): Promise<{ status: string } | any> {
    try {
      const result = await this.paymentsService.authorize(authorizeDto, user);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOkResponse({
    description: 'Successfully captured transaction on payment gateway',
    type: TransactionsInfosDoc,
  })
  @Post('/capture')
  @HttpCode(HttpStatus.OK)
  async capture(@Body() captureDto: CaptureDto, @CurrentUser() user: Client) {
    const transaction = await this.paymentsService.capture(captureDto, user);

    return transaction;
  }

  @ApiOkResponse({
    description: 'Successfully captured transaction on payment gateway',
    type: TransactionsInfosDoc,
  })
  @Post('/capture/installment/:id')
  @HttpCode(HttpStatus.OK)
  async captureInstallment(
    @Body() captureInstallmentDto: CaptureInstallmentDto,
    @Param('id') id: string,
    @CurrentUser() user: Client,
  ) {
    const transaction = await this.paymentsService.captureInstallment(
      { ...captureInstallmentDto, id },
      user,
    );

    return transaction;
  }

  @ApiOkResponse({
    description: 'Successfully refund transaction on payment gateway',
    type: TransactionsInfosDoc,
  })
  @Delete('/refund')
  @HttpCode(HttpStatus.OK)
  async refund(@Body() refundDto: RefundDto, @CurrentUser() user: Client) {
    const transaction = await this.paymentsService.refund(refundDto, user);
    return transaction;
  }

  @ApiBody({
    type: PaymentMakeRequestDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created transaction and integrated to gateway',
    type: TransactionsInfosDoc,
  })
  @Post('/make')
  @HttpCode(HttpStatus.OK)
  async make(
    @Body(FormatIfBilletPipe) authorizeDto: AuthorizeDto,
    @CurrentUser() user: Client,
    @Res() response,
  ): Promise<TransactionResponseDto> {
    const transaction = (await this.paymentsService.make(
      authorizeDto,
      user,
    )) as any;

    if (transaction.statusCode > 399) {
      return transaction;
    }

    return transaction.data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string, @CurrentUser() user: Client) {
    const transaction = await this.paymentsService.get(id, user);
    return transaction;
  }
}
