import { Document, Types } from 'mongoose';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { PaymentConfig, PaymentConfigDocument } from '@domain/entities/payment-config/payment-config';
export declare class InMemoryPaymentsConfigsRepository implements PaymentsConfigsRepository {
    paymentsConfigs: PaymentConfigDocument[];
    deleteMany({ paymentsConfigs }: {
        paymentsConfigs: any;
    }): Promise<any>;
    findById(id: string): Promise<PaymentConfigDocument | null>;
    create(params: {
        paymentConfig: any;
        id?: string;
    }): Promise<Document<unknown, any, PaymentConfig> & PaymentConfig & {
        _id: Types.ObjectId;
    }>;
    createMany({ paymentsConfigs, }: {
        paymentsConfigs: any;
    }): Promise<(Document<unknown, any, PaymentConfig> & PaymentConfig & {
        _id: Types.ObjectId;
    })[]>;
}
