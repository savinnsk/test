import { WebhookDataDto } from '@domain/dtos/webhook-data/webhook-data.dto';
import { TransactionStatus } from '@domain/enums/transaction-status.enum';
export interface IDataFromApi {
    data: WebhookDataDto;
    currentStatus: TransactionStatus;
}
export declare class ParserMapper {
    static toApi(payload: IDataFromApi): TransactionStatus;
}
