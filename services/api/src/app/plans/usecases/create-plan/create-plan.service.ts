import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { PlanDocument } from '@domain/entities/plan/plan.schema';
import { CreateProductService } from '@app/products/usecases/create-product/create-product.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { firstValueFrom } from 'rxjs';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';

@Injectable()
export class CreatePlanService {
  constructor(
    private readonly plansRepository: PlansRepository,

    private readonly createProductService: CreateProductService,

    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(plan: CreatePlanDto, client: Client): Promise<PlanDocument> {
    try {
      const { paymentGateway } = plan;

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        paymentGateway,
      );

      const data: any = await this.send(paymentGateway, 'create-plan', {
        data: plan,
        config: currentPaymentConfig,
      });

      if (responseIsAErrorType(data)) {
        return data;
      }

      if (!data.planId) {
        throw new BadGatewayException('Error in plan creation');
      }

      const { product } = data;
      const productCreated = await this.createProductService.execute(product);

      data.productId = productCreated.id;

      const planCreated = await this.plansRepository.create({
        ...data,
        client,
      });

      if (!planCreated) {
        throw new BadRequestException('Plan cant be created.');
      }

      return planCreated;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
}
