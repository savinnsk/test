import { Document, Model, Types } from 'mongoose';
import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { PaymentConfig, PaymentConfigDocument } from '@domain/entities/payment-config/payment-config';
export declare class MongoPaymentsConfigsRepository implements PaymentsConfigsRepository {
    private readonly paymentModel;
    constructor(paymentModel: Model<PaymentConfigDocument>);
    deleteMany({ paymentsConfigs }: {
        paymentsConfigs: any;
    }): Promise<any>;
    findById(id: string): Promise<PaymentConfigDocument | null>;
    create({ paymentConfig, }: {
        paymentConfig: any;
    }): Promise<Document<unknown, any, PaymentConfig> & PaymentConfig & {
        _id: Types.ObjectId;
    }>;
    createMany({ paymentsConfigs, }: {
        paymentsConfigs: any;
    }): Promise<(Document<unknown, any, PaymentConfig> & PaymentConfig & {
        _id: Types.ObjectId;
    })[]>;
}
