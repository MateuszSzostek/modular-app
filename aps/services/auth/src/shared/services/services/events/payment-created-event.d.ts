import { Subjects } from './subjects';
export interface PaymentCreatedEvent {
    subject: Subjects.PaymentCreated;
    data: {
        id: string;
        orderId: string;
        stripeId: string;
    };
}
//# sourceMappingURL=payment-created-event.d.ts.map