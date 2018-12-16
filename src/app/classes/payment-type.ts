import { PaymentTypeInterface } from "../interfaces/payment-type.interface";

export class PaymentType implements PaymentTypeInterface {
    id: number; 
    description: string;
    enabled: boolean;

    constructor() {
        this.id = 0;
        this.description = null;
        this.enabled = false;
    }

}