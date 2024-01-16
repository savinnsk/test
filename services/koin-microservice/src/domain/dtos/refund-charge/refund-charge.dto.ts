import { IAmount } from '@domain/interfaces/amount.interface';

export interface RefundChargeDto {
  transaction: {
    reference_id: string;
  };
  amount: IAmount;
}
