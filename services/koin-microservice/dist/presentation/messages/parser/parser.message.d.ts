import { IDataFromApi } from '@common/mappers/parser.mapper';
export declare class ParserMessage {
    execute(payload: IDataFromApi): Promise<{
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    } | import("../../../domain/enums/transaction-status.enum").TransactionStatus>;
}
