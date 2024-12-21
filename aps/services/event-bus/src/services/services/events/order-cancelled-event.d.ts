import { Subjects } from './subjects';
export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
}
//# sourceMappingURL=order-cancelled-event.d.ts.map