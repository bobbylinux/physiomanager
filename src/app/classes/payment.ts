import { PaymentInterface } from './../interfaces/payment.interface';

export class Payment implements PaymentInterface {
    id: number;
    amount: number;
    payment_type_id: number;
    note: string;

    constructor() {
        id: 0;
        amount: 0.00;
        payment_type_id: 0;
        note: null;
    }

}
