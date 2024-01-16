import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizeMessage } from './authorize.message';
import { MyHttpModule } from '@infra/http/http.module';
import { HttpClientPort } from '@domain/ports/http.port';
import { AxiosAdapter } from '@infra/http/axios/axios.service';
import { AuthorizeTransactionService } from '@infra/koin/usecases/billet/authorize-transaction/authorize-transaction.service';
import { AuthService } from '@infra/koin/usecases/billet/auth/auth.service';
import { TokenizeCardPaymentService } from '@infra/koin/usecases/card/tokenize-card/tokenize-card.service';
import { CreateCardPaymentService } from '@infra/koin/usecases/card/create-payment/create-payment.service';

const mocks = {
  AUTHORIZE_PAYLOAD: () => import('@common/mocks/authorize-payload.mock'),
  AUTHORIZE_KOIN_RESPONSE: () =>
    import('@common/mocks/authorize-koin-response.mock'),
  AUTHORIZE_API_RESPONSE: () =>
    import('@common/mocks/authorize-api-response.mock'),
  AUTH_KOIN_RESPONSE: () => import('@common/mocks/auth-koin-response.mock'),
};

describe('Authorize', () => {
  let authorizeMessage: AuthorizeMessage;
  let authorizeTransactionService: AuthorizeTransactionService;
  let tokenizeCardPaymentService: TokenizeCardPaymentService;
  let createCardPaymentService: CreateCardPaymentService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MyHttpModule, ConfigModule],
      controllers: [AuthorizeMessage],
      providers: [
        AuthorizeTransactionService,
        TokenizeCardPaymentService,
        CreateCardPaymentService,
        AuthService,
        ConfigService,
        {
          provide: HttpClientPort,
          useClass: AxiosAdapter,
        },
      ],
    }).compile();

    authorizeMessage = module.get<AuthorizeMessage>(AuthorizeMessage);
    authService = module.get<AuthService>(AuthService);
    authorizeTransactionService = module.get<AuthorizeTransactionService>(
      AuthorizeTransactionService,
    );
    createCardPaymentService = module.get<CreateCardPaymentService>(
      CreateCardPaymentService,
    );
    tokenizeCardPaymentService = module.get<TokenizeCardPaymentService>(
      TokenizeCardPaymentService,
    );
  });

  it('should be defined', () => {
    expect(authorizeMessage).toBeDefined();
  });

  it('should be able to authorize a transaction and return formatted response', async () => {
    jest
      .spyOn(authService, 'execute')
      .mockResolvedValue((await mocks.AUTH_KOIN_RESPONSE()).default as any);

    jest
      .spyOn(authorizeTransactionService, 'execute')
      .mockResolvedValue(
        (await mocks.AUTHORIZE_KOIN_RESPONSE()).default as any,
      );

    const expected = (await mocks.AUTHORIZE_API_RESPONSE()).default;

    const result = await authorizeMessage.execute(
      (
        await mocks.AUTHORIZE_PAYLOAD()
      ).default as any,
    );

    expect(result).toStrictEqual(expected);
  });

  it('should mapper api payload with correct values to koin', async () => {
    jest
      .spyOn(authorizeTransactionService, 'execute')
      .mockResolvedValue(
        (await mocks.AUTHORIZE_KOIN_RESPONSE()).default as any,
      );

    const expected = (await mocks.AUTHORIZE_API_RESPONSE()).default;

    const result = await authorizeMessage.execute(
      (
        await mocks.AUTHORIZE_PAYLOAD()
      ).default as any,
    );

    expect(result).toStrictEqual(expected);
  });
});
