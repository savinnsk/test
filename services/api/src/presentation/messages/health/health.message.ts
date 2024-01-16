import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class HealthMessage {
  @EventPattern('payment_capture_test')
  paymentCaptureTest(data: any) {
    console.log('RECEIVE(payment_capture_test): ', data);
  }

  @EventPattern('pagarme_capture_response_test')
  pagarmeCaptureResponseTest(data: any) {
    console.log('RECEIVE(pagarme_capture_response_test): ', data);
  }

  @EventPattern('pagseguro_capture_response_test')
  pagseguroCaptureResponseTest(data: any) {
    console.log('RECEIVE(pagseguro_capture_response_test): ', data);
  }
}
