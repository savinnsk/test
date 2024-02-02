export type IPayload<T> = {
    data: T;
    config: {
        key: string;
        publicKey: string;
    };
};
