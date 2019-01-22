import { PaymentTypeInterface } from "./payment-type.interface";

export interface PaymentInterface {
    id: number;
    amount: number;
    payment_type_id: number;
    note: string;
    plan_id: number;
    payment_type: PaymentTypeInterface;
}