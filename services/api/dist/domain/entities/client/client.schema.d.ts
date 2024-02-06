import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { PaymentConfig } from '../payment-config/payment-config';
export type ClientDocument = HydratedDocument<Client>;
export declare class Client {
    _id: ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    apiKey: string;
    paymentsConfigs: PaymentConfig[];
}
export declare const ClientSchema: mongoose.Schema<Client, mongoose.Model<Client, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Client>;
