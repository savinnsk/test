import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { TransactionStatus } from '@app/transactions/enums/status.enum';
import { PaymentGateway } from './enums/payment.enum';
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { CreateTransactionService } from '@app/transactions/usecases/create-transaction/create-transaction.service';
import { UpdateTransactionIdService } from '@app/transactions/usecases/update-transaction-id/update-transaction-id.service';
import { UpdateTransactionStatusService } from '@app/transactions/usecases/update-transaction-status/update-transaction-status.service';
import { FindTransactionByIdService } from '@app/transactions/usecases/find-transaction-by-id/find-transaction-by-id.service';
import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';
import { Client } from '@domain/entities/client/client.schema';
import { RefundDto } from '@domain/dtos/refund.dto';
import { UpdateBilletByTransactionIdService } from '@app/transactions/usecases/update-billet-by-transaction-id/update-billet-by-transaction-id.service';
import { UpdatePixQrByTransactionIdService } from '@app/transactions/usecases/update-pix-qr-by-transaction-id/update-pix-qr-by-transaction-id.service';
import { UpdateMetadataService } from '@app/transactions/usecases/update-metadata/update-metadata.service';
import { CurrencyQuotesPort } from '@domain/ports/currency-quotes.port';
import { FindTransactionByTransactionIdService } from '@app/transactions/usecases/find-transaction-by-transaction-id/find-transaction-by-transaction-id.service';
import { CaptureInstallmentDto } from '@domain/dtos/capture-installment.dto';
import { UpdateTransactionService } from '@app/transactions/usecases/update-transaction/update-transaction.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly findTransactionByIdService: FindTransactionByIdService,
    private readonly findTransactionByTransactionIdService: FindTransactionByTransactionIdService,
    private readonly updateTransactionIdService: UpdateTransactionIdService,
    private readonly updateMetadataService: UpdateMetadataService,
    private readonly updateTransactionStatusService: UpdateTransactionStatusService,
    private readonly updateTransactionService: UpdateTransactionService,
    private readonly updatePixQrByTransactionIdService: UpdatePixQrByTransactionIdService,
    private readonly updateBilletByTransactionIdService: UpdateBilletByTransactionIdService,
    private readonly currencyQuotesService: CurrencyQuotesPort,
    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('KOIN') private readonly koinClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async client(paymentGateway: PaymentGateway): Promise<any> {
    return this.getPaymentGatewayClient(paymentGateway).send(
      { cmd: 'get_client_needs' },
      { teste: 'a' },
    );
  }

  async getInstallments() {
    return [];
  }

  async authorize(authorizeDto: AuthorizeDto, client: Client): Promise<any> {
    console.log('Initializing authorization business logic');

    const doesCurrencyIsBRL = authorizeDto.currency === 'BRL';
    if (!doesCurrencyIsBRL) {
      const currencyQuotes = await this.currencyQuotesService.convert({
        from: authorizeDto.currency,
        to: 'BRL',
        value: authorizeDto.amount,
      });

      Object.assign(authorizeDto, {
        currency: 'BRL',
        amount: Number(Number(currencyQuotes.exchange).toFixed(2)),
        exchange: {
          from: currencyQuotes.from,
          to: currencyQuotes.to,
          value: currencyQuotes.initialValue,
          quotation: currencyQuotes.quotation,
        },
      });
    }

    const transaction = await this.createTransactionService.execute({
      transaction: authorizeDto,
      client,
    });

    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      authorizeDto.paymentGateway,
    );

    const authorizedTransaction = await this.send(
      authorizeDto.paymentGateway,
      'authorize',
      {
        data: authorizeDto,
        config: currentPaymentConfig,
        apiId: transaction.id,
      },
    );

    if (this.microReturnWrongResponse(authorizedTransaction)) {
      return authorizedTransaction;
    }

    await this.updateTransactionService.execute(transaction._id.toString(), {
      transactionId: authorizedTransaction.data?.transactionId,
      installmentOptions: authorizedTransaction.data.installmentOptions,
    });

    return await this.updateTransactionStatusService.execute(
      transaction._id.toString(),
      TransactionStatus.authorized,
    );
  }

  async refund(refundDto: RefundDto, client: Client): Promise<any> {
    const currentTransaction = await this.findTransactionByIdService.execute(
      refundDto.transactionId,
    );

    if (
      !currentTransaction ||
      `${currentTransaction.client._id}` !== `${client._id}`
    ) {
      throw new NotFoundException('Transaction not found');
    }

    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      currentTransaction.paymentGateway,
    );

    const refundedTransaction = await this.send(
      currentTransaction.paymentGateway,
      'refund',
      {
        data: {
          transactionId: currentTransaction.transactionId,
          metadata: currentTransaction.metadata,
        },
        config: currentPaymentConfig,
      },
    );

    if (this.microReturnWrongResponse(refundedTransaction)) {
      return refundedTransaction;
    }

    const metadata = {
      ...currentTransaction.metadata,
      refundId: refundedTransaction.data.id,
    };

    await this.updateMetadataService.execute(
      currentTransaction.transactionId.toString(),
      metadata,
    );

    return await this.updateTransactionStatusService.execute(
      currentTransaction._id.toString(),
      TransactionStatus.refunded,
    );
  }

  private microReturnWrongResponse(response: any): boolean {
    return (
      (response?.statusCode && response?.statusCode > 399) ||
      response?.status === 'failed'
    );
  }

  async capture(
    captureDto: CaptureDto,
    client: Client,
  ): Promise<TransactionDocument> {
    const transaction = await this.findTransactionByIdService.execute(
      captureDto.transactionId,
    );

    if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
      throw new NotFoundException('Transaction not found');
    }

    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      transaction.paymentGateway,
    );

    const capturedTransaction = await this.send(
      transaction.paymentGateway,
      'capture',
      {
        data: transaction,
        config: currentPaymentConfig,
        apiId: transaction.id,
      },
    );

    console.log('capturedTransaction', capturedTransaction);

    if (this.microReturnWrongResponse(capturedTransaction)) {
      return capturedTransaction;
    }

    await this.updateTransactionIdService.execute(
      transaction._id.toString(),
      capturedTransaction.data.transactionId,
    );

    await this.updateTransactionIdService.execute(
      transaction._id.toString(),
      capturedTransaction.data.transactionId,
    );

    const metadata = { captureId: capturedTransaction.data.id };

    await this.updateMetadataService.execute(
      transaction.transactionId.toString(),
      metadata,
    );

    return await this.updateTransactionStatusService.execute(
      transaction._id.toString(),
      TransactionStatus.captured,
    );
  }

  async captureInstallment(
    captureInstallmentDto: CaptureInstallmentDto & { id: string },
    client: Client,
  ): Promise<TransactionDocument> {
    const transaction = await this.findTransactionByIdService.execute(
      captureInstallmentDto.id,
    );
    transaction.transactionId = captureInstallmentDto.installmentOptionId;
    console.log('captureInstallmentDto', captureInstallmentDto);

    if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
      throw new NotFoundException('Transaction not found');
    }

    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      transaction.paymentGateway,
    );

    const capturedTransaction = await this.send(
      transaction.paymentGateway,
      'capture',
      {
        data: transaction,
        config: currentPaymentConfig,
        apiId: transaction.id,
      },
    );

    if (this.microReturnWrongResponse(capturedTransaction)) {
      return capturedTransaction;
    }

    await this.updateTransactionIdService.execute(
      transaction._id.toString(),
      capturedTransaction.data.transactionId,
    );

    const metadata = {
      installmentOptionId: captureInstallmentDto.installmentOptionId,
      statusKoin: capturedTransaction.data.statusKoin,
    };

    await this.updateMetadataService.execute(
      capturedTransaction.data.transactionId.toString(),
      metadata,
    );

    return await this.updateTransactionStatusService.execute(
      transaction._id.toString(),
      TransactionStatus.captured,
    );
  }

  async make(
    authorizeDto: AuthorizeDto,
    client: Client,
  ): Promise<{ data: TransactionDocument }> {
    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      authorizeDto.paymentGateway,
    );

    if (authorizeDto.paymentMethod === 'billet') {
      const response = await this.authorize(authorizeDto, client);

      if (this.microReturnWrongResponse(response)) {
        return response;
      }

      const responseTransaction: { data: TransactionDocument } =
        await this.send(authorizeDto.paymentGateway, 'get_transaction', {
          data: {
            id: response.transactionId,
            paymentMethod: response.paymentMethod,
          },
          config: currentPaymentConfig,
        });

      await this.updateBilletByTransactionIdService.execute(
        responseTransaction.data.transactionId,
        responseTransaction.data.billet,
      );

      return responseTransaction;
    }
    if (authorizeDto.paymentMethod === 'pix') {
      const response = await this.authorize(authorizeDto, client);

      if (this.microReturnWrongResponse(response)) {
        return response;
      }

      const responseTransaction: { data: TransactionDocument } =
        await this.send(authorizeDto.paymentGateway, 'get_transaction', {
          data: {
            id: response.transactionId,
            paymentMethod: response.paymentMethod,
          },
          config: currentPaymentConfig,
        });

      await this.updatePixQrByTransactionIdService.execute(
        responseTransaction.data.transactionId,
        responseTransaction.data.pix,
      );

      return responseTransaction;
    }
  }

  async get(
    transactionId: string,
    client: Client,
  ): Promise<TransactionDocument> {
    const transaction = await this.findTransactionByIdService.execute(
      transactionId,
    );

    if (!transaction || `${transaction.client._id}` !== `${client._id}`) {
      throw new NotFoundException('Transaction not found');
    }
    const currentPaymentConfig = this.getGatewayKey(
      client.paymentsConfigs,
      transaction.paymentGateway,
    );

    const responseTransaction = await this.send(
      transaction.paymentGateway,
      'get_transaction',
      {
        data: { id: transaction.transactionId },
        config: currentPaymentConfig,
      },
    );

    return responseTransaction.data;
  }

  async parseToApi(gatewayData: any): Promise<any> {
    console.log('API PARSE SERVICE');

    let id: string;
    let transaction: TransactionDocument;

    if (gatewayData.reference) {
      id = gatewayData.reference ?? gatewayData?.data?.charges[0]?.id;

      transaction = await this.findTransactionByIdService.execute(id);
    } else {
      id = this.getId(gatewayData);

      transaction = await this.findTransactionByTransactionIdService.execute(
        id,
      );
    }

    if (!transaction) {
      throw new NotFoundException('Transaction not found. with ' + id);
    }
    const { paymentGateway } = transaction;

    const currentStatus = transaction.currentStatus;
    const status: TransactionStatus = await this.send(
      paymentGateway,
      'to-api',
      { data: gatewayData, currentStatus },
    );

    if (status == transaction.currentStatus) {
      return transaction;
    }

    await this.updateTransactionStatusService.execute(
      transaction._id.toString(),
      status,
    );

    return (
      (await this.findTransactionByTransactionIdService.execute(id)) ||
      (await this.findTransactionByIdService.execute(id))
    );
  }

  private getPaymentGatewayClient(paymentGateway: PaymentGateway): ClientProxy {
    return this[`${paymentGateway}Client`];
  }

  private async send(
    paymentGateway: PaymentGateway,
    action: string,
    payload: any,
  ): Promise<any> {
    return await firstValueFrom(
      this.getPaymentGatewayClient(paymentGateway).send(
        `${paymentGateway}-${action}`,
        payload,
      ),
    );
  }

  private getGatewayKey(paymentConfigs: any, getewayName: string) {
    const currentPaymentConfig = paymentConfigs.find(
      (paymentConfig) => paymentConfig.name === getewayName,
    );
    return currentPaymentConfig;
  }

  private getId(_data: any): string {
    if (_data.charges) {
      return _data.charges[0].id;
    }
    if (_data?.data?.charges) {
      return _data?.data?.charges[0].id;
    }

    if (_data.event) {
      return _data.event.data.charge?.id
        ? _data.event.data.charge?.id
        : _data.event.data?.bill
        ? _data.event.data?.bill?.id
        : _data.event.data?.period?.id;
    }

    return _data.data.id;
  }
}
