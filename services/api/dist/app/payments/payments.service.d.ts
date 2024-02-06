import { ClientProxy } from '@nestjs/microservices';
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
export declare class PaymentsService {
    private readonly createTransactionService;
    private readonly findTransactionByIdService;
    private readonly findTransactionByTransactionIdService;
    private readonly updateTransactionIdService;
    private readonly updateMetadataService;
    private readonly updateTransactionStatusService;
    private readonly updateTransactionService;
    private readonly updatePixQrByTransactionIdService;
    private readonly updateBilletByTransactionIdService;
    private readonly currencyQuotesService;
    private readonly pagseguroClient;
    private readonly paypalClient;
    private readonly pagarmeClient;
    private readonly mercadopagoClient;
    private readonly koinClient;
    private readonly vindiClient;
    constructor(createTransactionService: CreateTransactionService, findTransactionByIdService: FindTransactionByIdService, findTransactionByTransactionIdService: FindTransactionByTransactionIdService, updateTransactionIdService: UpdateTransactionIdService, updateMetadataService: UpdateMetadataService, updateTransactionStatusService: UpdateTransactionStatusService, updateTransactionService: UpdateTransactionService, updatePixQrByTransactionIdService: UpdatePixQrByTransactionIdService, updateBilletByTransactionIdService: UpdateBilletByTransactionIdService, currencyQuotesService: CurrencyQuotesPort, pagseguroClient: ClientProxy, paypalClient: ClientProxy, pagarmeClient: ClientProxy, mercadopagoClient: ClientProxy, koinClient: ClientProxy, vindiClient: ClientProxy);
    client(paymentGateway: PaymentGateway): Promise<any>;
    getInstallments(): Promise<any[]>;
    authorize(authorizeDto: AuthorizeDto, client: Client): Promise<any>;
    refund(refundDto: RefundDto, client: Client): Promise<any>;
    private microReturnWrongResponse;
    capture(captureDto: CaptureDto, client: Client): Promise<TransactionDocument>;
    captureInstallment(captureInstallmentDto: CaptureInstallmentDto & {
        id: string;
    }, client: Client): Promise<TransactionDocument>;
    make(authorizeDto: AuthorizeDto, client: Client): Promise<{
        data: TransactionDocument;
    }>;
    get(transactionId: string, client: Client): Promise<TransactionDocument>;
    parseToApi(gatewayData: any): Promise<any>;
    private getPaymentGatewayClient;
    private send;
    private getGatewayKey;
    private getId;
}
