import { WebhookDataDto } from '@domain/dtos/webhook-data/webhook-data.dto';
import { StatusFromWebhook } from '@domain/enums/status-from-webhook.enum';
import { TransactionStatus } from '@domain/enums/transaction-status.enum';

export interface IDataFromApi {
  data: WebhookDataDto;
  currentStatus: TransactionStatus;
}

export class ParserMapper {
  static toApi(payload: IDataFromApi): TransactionStatus {
    const { codeReturn } = payload.data;

    if (codeReturn === StatusFromWebhook.approved) {
      return TransactionStatus.captured;
    }

    if (
      codeReturn === StatusFromWebhook.cancelled ||
      codeReturn === StatusFromWebhook.repproved
    ) {
      return TransactionStatus.cancelled;
    }

    if (codeReturn === StatusFromWebhook.pending) {
      return TransactionStatus.pending;
    }

    return payload.currentStatus;
  }
}
