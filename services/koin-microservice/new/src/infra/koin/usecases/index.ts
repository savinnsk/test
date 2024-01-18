import { AuthService } from './billet/auth/auth.service';
import { AuthorizeTransactionService } from './billet/authorize-transaction/authorize-transaction.service';
import { CaptureTransactionService } from './billet/capture-transaction/capture-transaction.service';
import { GetPaymentService } from './billet/get-payment/get-payment.service';
import { RefundPaymentService } from './billet/refund-payment/refund-payment.service';
import { CaptureCardPaymentService } from './card/capture-payment/capture-payment.service';
import { CreateCardPaymentService } from './card/create-payment/create-payment.service';
import { RefundCardPaymentService } from './card/refund-payment/refund-payment.service';
import { TokenizeCardPaymentService } from './card/tokenize-card/tokenize-card.service';
import { SendNotificationPaymentService } from './notication/send-nofication.service';

export default [
  AuthService,
  AuthorizeTransactionService,
  RefundPaymentService,
  GetPaymentService,
  CaptureTransactionService,
  CreateCardPaymentService,
  CaptureCardPaymentService,
  RefundCardPaymentService,
  TokenizeCardPaymentService,
  SendNotificationPaymentService,
];
