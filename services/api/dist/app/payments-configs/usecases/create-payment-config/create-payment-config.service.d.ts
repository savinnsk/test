import { PaymentsConfigsRepository } from '@app/payments-configs/repositories/payments-configs.repository';
import { CreatePaymentConfigDto } from '@domain/dtos/payment-config/create-payment-config.dto';
import { PaymentConfigDocument } from '@domain/entities/payment-config/payment-config';
interface IPaymentConfigService {
    createPaymentConfig: CreatePaymentConfigDto;
}
export declare class CreatePaymentConfigService {
    private readonly paymentConfigRepository;
    constructor(paymentConfigRepository: PaymentsConfigsRepository);
    execute({ createPaymentConfig, }: IPaymentConfigService): Promise<PaymentConfigDocument>;
}
export {};
