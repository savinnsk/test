import { MyHttpModule } from '@infra/http/http.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CaptureMessage } from './capture.message';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { HttpClientPort } from '@domain/ports/http.port';
import { AxiosAdapter } from '@infra/http/axios/axios.service';
import { CaptureTransactionService } from '@infra/koin/usecases/billet/capture-transaction/capture-transaction.service';

import SUCCESS_PAYLOAD from '@common/mocks/capture/capture-success-payload.mock';
import SUCCESS_AUTH_RESPONSE from '@common/mocks/auth-koin-response.mock';
import ALREADY_PROCESS_ERROR_RESPONSE from '@common/mocks/capture/capture-koin-response-already-process-error.mock';
import SUCCESS_RESPONSE from '@common/mocks/capture/capture-koin-response-already-process-error.mock';
import { CaptureCardPaymentService } from '@infra/koin/usecases/card/capture-payment/capture-payment.service';

const mocks = {
  SUCCESS_PAYLOAD,
  SUCCESS_AUTH_RESPONSE,
  ALREADY_PROCESS_ERROR_RESPONSE,
  SUCCESS_RESPONSE,
};

describe('CaptureMessage', () => {
  let captureMessage: CaptureMessage;
  let authService: AuthService;
  let captureTransactionService: CaptureTransactionService;
  let captureCardPaymentCard: CaptureCardPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MyHttpModule, ConfigModule],
      controllers: [CaptureMessage],
      providers: [
        CaptureTransactionService,
        CaptureCardPaymentService,
        AuthService,
        ConfigService,
        {
          provide: HttpClientPort,
          useClass: AxiosAdapter,
        },
      ],
    }).compile();

    captureMessage = module.get<CaptureMessage>(CaptureMessage);
    authService = module.get<AuthService>(AuthService);
    captureTransactionService = module.get<CaptureTransactionService>(
      CaptureTransactionService,
    );
    captureCardPaymentCard = module.get<CaptureCardPaymentService>(
      CaptureCardPaymentService,
    );
  });

  it('should be defined', () => {
    expect(captureMessage).toBeDefined();
  });

  it('should be able to capture a transaction', async () => {
    jest
      .spyOn(authService, 'execute')
      .mockRejectedValueOnce(mocks.SUCCESS_AUTH_RESPONSE);
    jest
      .spyOn(captureTransactionService, 'execute')
      .mockRejectedValueOnce(mocks.SUCCESS_RESPONSE);

    const result = await captureMessage.execute(mocks.SUCCESS_PAYLOAD as any);
    console.log('🚀 ~ file: capture.message.spec.ts:62 ~ it ~ result:', result);

    const expected = {};

    expect(result).toStrictEqual(expected);
  });
});
