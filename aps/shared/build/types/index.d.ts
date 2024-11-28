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
