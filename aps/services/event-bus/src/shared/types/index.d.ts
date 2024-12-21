export type Message = {};
export type Stan = {
    subscriptionOptions: () => void;
    setDeliverAllAvailable: () => void;
    setManualAckMode: (stan: true) => void;
    setAckWait: (ackAwait: boolean) => void;
    setDurableName: (queueGroupName: string) => void;
    subscribe: () => void;
    listen: () => void;
};
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