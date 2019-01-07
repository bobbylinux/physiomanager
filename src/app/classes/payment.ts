import { PaymentInterface } from './../interfaces/payment.interface';

export class Payment implements PaymentInterface {
    id: number;
    amount: number;
    payment_type_id: number;
    note: string;

    constructor() {
        this.id = 0;
        this.amount = 0.00;
        this.payment_type_id = 0;
        this.note = null;
    }

}
