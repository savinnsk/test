import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthorizeDto as ApiCreateAuthorizeDto } from 'payment-hub-types';
import { IPayload } from '@domain/interfaces/payload.interface';
import { HandlerError } from '@common/formatters/handler-error';
import { OrderMapper } from '@common/mappers/order.mapper';
import { AuthorizeTransactionService } from '@infra/koin/usecases/billet/authorize-transaction/authorize-transaction.service';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { CreateCardPaymentService } from '@infra/koin/usecases/card/create-payment/create-payment.service';
import {
  Credentials,
  CredentialsMapper,
} from '@common/mappers/credential-mapper';
import { TokenizeCardPaymentService } from '@infra/koin/usecases/card/tokenize-card/tokenize-card.service';
@Controller()
export class AuthorizeMessage {
  constructor(
    private readonly tokenizeCardPaymentService: TokenizeCardPaymentService,
    private readonly authorizeTransactionService: AuthorizeTransactionService,
    private readonly createCardPaymentService: CreateCardPaymentService,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern('koin-authorize')
  async execute(
    @Payload()
    payload: IPayload<
      ApiCreateAuthorizeDto & {
        transactionId: string;
        callbackUrl: string;
        metadata: {
          antifraud_ref_id: string;
          sessionId: string;
          ip: string;
        };
      }
    >,
  ) {
    console.log('payload: ', payload);

    try {
      if (payload.data.amount < 100) {
        return {
          status: 'failed',
          statusCode: 400,
          message: 'Bad Request',
          errors: ['The amount must be greater than or equal to 100'],
        };
      }

      const credentials = CredentialsMapper.getKeysValue(
        payload.config.publicKey,
      );

      if (payload.data.paymentMethod === 'billet') {
        const formattedDataApiToKoin = OrderMapper.billetToKoin({
          data: payload.data,
        }).data;

        const auth = await this.authService.execute({
          url: 'https://pre-prd-sp-api.koin.com.br/Transaction/authorization',
          consumerKey: credentials.publicKey,
          secretKey: payload.config.key,
        });

        if ('errors' in auth) {
          return auth;
        }

        const order = await this.authorizeTransactionService.execute({
          data: formattedDataApiToKoin,
          token: auth.body.Authorization,
        });
        if ('errors' in order) {
          return order;
        }

        const result = OrderMapper.toApi({
          data: order.body,
          dto: payload.data,
        });

        return result;
      }

      const result = await this.cardPayment(payload, credentials);

      return result;
    } catch (err) {
      console.log("Error tn 'koin-authorize-message : ", err);
      return HandlerError.makeError(err);
    }
  }

  async cardPayment(
    payload: IPayload<
      ApiCreateAuthorizeDto & {
        transactionId: string;
        callbackUrl: string;
        metadata: {
          sessionId: string;
          ip: string;
          antifraud_ref_id: string;
        };
      }
    >,
    credentials: Credentials,
  ) {
    const creditCardPayloadFormatted = OrderMapper.tokenizeCard(
      payload.data.creditCard,
      payload.data.code,
    );

    const creditCardToken = await this.tokenizeCardPaymentService.execute({
      data: creditCardPayloadFormatted,
      token: credentials.privateKey,
    });

    if ('errors' in creditCardToken) {
      return creditCardToken;
    }

    const formattedDataApiToKoin = OrderMapper.cardToKoin({
      data: Object.assign(payload.data, {
        koinCreditCardToken: creditCardToken.body.secure_token,
      }),
      credentials,
    }).data;

    const order = await this.createCardPaymentService.execute({
      data: formattedDataApiToKoin,
      token: credentials.privateKey,
    });

    if ('errors' in order) {
      return order;
    }

    const result = OrderMapper.toApi({
      data: order.body,
      dto: payload.data,
    });
    console.log('Result : ', result);
    return result;
  }
}
