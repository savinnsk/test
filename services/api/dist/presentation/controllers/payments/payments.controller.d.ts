/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TransactionResponseDto } from '@domain/dtos/transaction-response.dto';
import { AuthorizeDto } from '@domain/dtos/authorize.dto';
import { CaptureDto } from '@domain/dtos/capture.dto';
import { PaymentsService } from '@app/payments/payments.service';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { Client } from '@domain/entities/client/client.schema';
import { RefundDto } from '@domain/dtos/refund.dto';
import { CaptureInstallmentDto } from '@domain/dtos/capture-installment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    client(paymentGateway: PaymentGateway): Promise<any>;
    getInstallments(): Promise<any[]>;
    authorize(authorizeDto: AuthorizeDto, user: Client): Promise<{
        status: string;
    } | any>;
    capture(captureDto: CaptureDto, user: Client): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/transaction/transaction.schema").Transaction> & import("../../../domain/entities/transaction/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    captureInstallment(captureInstallmentDto: CaptureInstallmentDto, id: string, user: Client): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/transaction/transaction.schema").Transaction> & import("../../../domain/entities/transaction/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    refund(refundDto: RefundDto, user: Client): Promise<any>;
    make(authorizeDto: AuthorizeDto, user: Client, response: any): Promise<TransactionResponseDto>;
    get(id: string, user: Client): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/transaction/transaction.schema").Transaction> & import("../../../domain/entities/transaction/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
