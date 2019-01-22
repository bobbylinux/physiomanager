import { PaymentInterface } from './../interfaces/payment.interface';
import { PaymentTypeInterface } from '../interfaces/payment-type.interface';
import { PaymentType } from 'src/app/classes/payment-type';

export class Payment implements PaymentInterface {
    id: number;
    amount: number;
    payment_type_id: number;
    note: string;
    plan_id: number;
    payment_type: PaymentTypeInterface;

    constructor() {
        this.id = 0;
        this.amount = 0.00;
        this.payment_type_id = 0;
        this.note = null;
        this.plan_id = 0;
        this.payment_type = new PaymentType;
    }

}
