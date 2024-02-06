export interface IConvertProps {
    from: string;
    to: string;
    value: number;
}
export interface IConvertResponse {
    from: string;
    to: string;
    initialValue: number;
    quotation: number;
    exchange: number;
}
export declare abstract class CurrencyQuotesPort {
    abstract convert(props: IConvertProps): Promise<IConvertResponse>;
}
