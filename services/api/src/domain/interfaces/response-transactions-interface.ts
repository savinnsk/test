export interface IRequestFromGateway {
  data: {
    paymentGateway: string;
    paymentMethod?: string;
    address?: any;
    transactionId?: string;
    amount: number;
    currency: string;
    installments?: number;
    payer?: any;
    creditCard?: any;
    billet?: any;
    pix?: any;
    description?: string;
  };
}
