export type Response<T> = {
    status: number;
    data: T | {
        errors: {
            messageCode: string;
        };
        param?: string;
    };
};
//# sourceMappingURL=index.d.ts.map