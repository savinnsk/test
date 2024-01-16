import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentGateway } from '@app/payments/enums/payment.enum';
import { firstValueFrom } from 'rxjs';
import { FindPlanService } from '../find-plan/find-plan.service';
import { Client } from '@domain/entities/client/client.schema';
import { responseIsAErrorType } from '@helpers/functions/respose-is-error-type';

@Injectable()
export class UpdatePlanService {
  constructor(
    private readonly plansRepository: PlansRepository,
    private readonly findPlanService: FindPlanService,
    @Inject('PAGSEGURO') private readonly pagseguroClient: ClientProxy,
    @Inject('PAYPAL') private readonly paypalClient: ClientProxy,
    @Inject('PAGARME') private readonly pagarmeClient: ClientProxy,
    @Inject('MERCADOPAGO') private readonly mercadopagoClient: ClientProxy,
    @Inject('VINDI') private readonly vindiClient: ClientProxy,
  ) {}

  async execute(data: UpdatePlanDto, id: string, client: Client) {
    try {
      const currentPlan = await this.findPlanService.execute(id);

      const currentPaymentConfig = this.getGatewayKey(
        client.paymentsConfigs,
        data.paymentGateway,
      );

      const response: any = await this.send(
        data.paymentGateway,
        'update-plan',
        {
          data: { ...data, id: currentPlan.planId },
          config: currentPaymentConfig,
        },
      );

      if (responseIsAErrorType(response)) {
        return response;
      }

      const planUpdated = await this.plansRepository.update(response, id);

      if (!planUpdated) {
        throw new BadRequestException('Plan cant be updated.');
      }

      return planUpdated;
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
