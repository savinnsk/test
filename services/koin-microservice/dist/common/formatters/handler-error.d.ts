export declare class HandlerError {
    static makeError(error: any): {
        status: string;
        statusCode: number;
        message: any;
        errors: any[];
    };
}
